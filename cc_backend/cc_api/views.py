from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Session
from django.shortcuts import get_object_or_404

class StartSessionView(APIView):
    """
    Starts a new session and returns the session data.
    """

    def post(self, request, *args, **kwargs):
        session = Session.objects.create()
        return Response(
            {"uuid": str(session.uuid), "numeric_id": session.numeric_id},
            status=status.HTTP_201_CREATED,
        )


class EndSessionView(APIView):
    """
    Ends (deletes) a session and returns a confirmation message.
    """

    def delete(self, request, uuid, *args, **kwargs):
        session = get_object_or_404(Session, uuid=uuid)
        session.delete()
        return Response({"message": "Session ended successfully"}, status=status.HTTP_200_OK)


class GetWordsView(APIView):
    """
    Retrieves the words and their vote counts for a specific session.
    """

    def get(self, request, uuid, *args, **kwargs):
        session = get_object_or_404(Session, uuid=uuid)
        return Response({"words": session.get_words()}, status=status.HTTP_200_OK)


class VoteView(APIView):
    """
    Adds a new word or increments the vote count for an existing word.
    """

    def post(self, request, uuid, *args, **kwargs):
        session = get_object_or_404(Session, uuid=uuid)
        word = request.data.get("word")

        if not word:
            return Response(
                {"error": "No word provided"}, status=status.HTTP_400_BAD_REQUEST
            )

        session.add_word(word)
        return Response({"message": f"'{word}' has been added or updated."}, status=status.HTTP_200_OK)
