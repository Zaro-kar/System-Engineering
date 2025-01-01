import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Session
from django.db.models import Max 

class GetSessionByNumericIdView(APIView):
    """
    Retrieves a session by its numeric ID.
    """

    def get(self, request, numeric_id, *args, **kwargs):
        session = get_object_or_404(Session, numeric_id=numeric_id)
        return Response(
            {
                "uuid": str(session.uuid),
                "numeric_id": session.numeric_id,
                "words": session.words,
                "created_at": session.created_at,
            },
            status=status.HTTP_200_OK,
        )
    
class StartSessionView(APIView):
    """
    Starts a new session and returns the session data. If all numeric IDs are used, returns an error.
    """

    def post(self, request, *args, **kwargs):
        # Check if all numeric IDs are used
        if Session.objects.count() >= 1000:  # Limit to 1000 sessions (000–999)
            return Response(
                {"error": "All sessions are used, try later."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Find the next available numeric ID
        existing_ids = set(Session.objects.values_list("numeric_id", flat=True))
        for next_numeric_id in range(1000):
            # Format as string with leading zeros
            numeric_id_str = f"{next_numeric_id:03d}" 
            if numeric_id_str not in existing_ids:
                break
        else:
            return Response(
                {"error": "All sessions are used, try later."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create the session with the next numeric ID
        session = Session.objects.create(numeric_id=numeric_id_str)
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