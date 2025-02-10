"""
Views for the cc_wordcloud app.
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


from .models import Session

class GetSessionView(APIView):
    """
    Retrieves a session by its id or code.
    """

    def get(self, request, *args, **kwargs):
        """
        Handle GET request to retrieve session details.

        Args:
            session_code (str): The code of the session.
            session_id (str): The UUID of the session.

        Returns:
            Response: JSON response containing session details.
        """
        uuid_param = request.query_params.get('session_id')
        code_param = request.query_params.get('session_code')

        if uuid_param:
            session = get_object_or_404(Session, uuid=uuid_param)
        elif code_param:
            session = get_object_or_404(Session, code=code_param)
        else:
            return Response(
                {"error": "Please enter a session id or code."},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {
                "session_id": str(session.uuid),
                "session_code": session.code,
                "words": session.words,
                "created_at": session.created_at,
            },
            status=status.HTTP_200_OK,
        )

class StartSessionView(APIView):
    """
    Starts a new session and returns the session data.
    If all session codes are used, returns an error.
    """

    def post(self, request):
        """
        Handle POST request to start a new session.

        Returns:
            Response: JSON response containing new session data or an error message.
        """
        if Session.objects.count() >= 1000:
            return Response(
                {"error": "All sessions are used, try later."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        existing_codes = set(Session.objects.values_list("code", flat=True))
        for next_code in range(1000):
            code_str = f"{next_code:03d}"
            if code_str not in existing_codes:
                break
        else:
            return Response(
                {"error": "All sessions are used, try later."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        session = Session.objects.create(code=code_str)
        return Response(
            {
                "session_id": str(session.uuid),
                "session_code": session.code,
                "words": session.words,
                "created_at": session.created_at,
            },
            status=status.HTTP_200_OK,
        )

class CloseSessionView(APIView):
    """
    Closes (deletes) a session and returns a confirmation message.
    """

    def delete(self, request, uuid):
        """
        Handle DELETE request to end a session.

        Args:
            uuid (str): The UUID of the session to be deleted.

        Returns:
            Response: JSON response confirming the deletion.
        """
        session = get_object_or_404(Session, uuid=uuid)
        session.delete()

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"session_{session.uuid}",
            {
                "type": "session_closed",
                "session": str(session.uuid),
            }
        )

        return Response(
            {"message": "Session successfully closed"},
            status=status.HTTP_200_OK,
        )

class VoteView(APIView):
    """
    Adds a new word or increments the vote count for an existing word.
    """

    def post(self, request, uuid):
        """
        Handle POST request to add or update a word's vote count.

        Args:
            request (Request): The HTTP request object.
            uuid (str): The UUID of the session.

        Returns:
            Response: JSON response confirming the addition or update, or an error message.
        """
        session: Session = get_object_or_404(Session, uuid=uuid)
        words = request.data.get("words")

        if not words:
            return Response(
                {"error": "No words provided"}, status=status.HTTP_400_BAD_REQUEST
            )

        for word in words:
            session.add_word(word)

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"session_{session.uuid}",
            {
                "type": "words_update",
                "session": str(session.uuid),
            } 
        )

        return Response(
            {"message": f"Words has been submitted."},
            status=status.HTTP_200_OK,
        )
