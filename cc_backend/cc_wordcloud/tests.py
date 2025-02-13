# pylint: disable=W0612, C0412
"""
Tests for the cc_wordcloud app.
"""
import uuid
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from .models import Session


class SessionTests(APITestCase):
    """
    Test suite for the session-related API endpoints.
    """

    def setUp(self):
        """
        Set up a test session before each test case.
        """
        self.session = Session.objects.create(code="001")

    def test_get_session_by_id(self):
        """
        Test retrieving a session using its UUID.
        """
        url = reverse("get-session") + f"?session_id={self.session.uuid}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["session_code"], "001")

    def test_get_session_by_code(self):
        """
        Test retrieving a session using its code.
        """
        url = reverse("get-session") + f"?session_code={self.session.code}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["session_id"], str(self.session.uuid))

    def test_get_session_invalid(self):
        """
        Test retrieving a session without providing an ID or code, expecting a 400 error.
        """
        url = reverse("get-session")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_start_session(self):
        """
        Test creating a new session and ensuring it exists in the database.
        """
        url = reverse("start-session")
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(Session.objects.filter(code=response.data["session_code"]).exists())

    def test_close_session(self):
        """
        Test deleting an existing session and ensuring it no longer exists.
        """
        url = reverse("close-session", args=[self.session.uuid])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Session.objects.filter(uuid=self.session.uuid).exists())

    def test_close_session_invalid(self):
        """
        Test attempting to delete a non-existing session, expecting a 404 error.
        """
        random_uuid = uuid.uuid4()
        url = reverse("close-session", args=[random_uuid])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_vote_session(self):
        """
        Test voting for a word in an existing session and ensuring the word is stored.
        """
        url = reverse("vote", args=[self.session.uuid])
        response = self.client.post(url, {"words": ["test"]}, format='json')
        self.session.refresh_from_db()
        self.assertIn("test", self.session.words)

    def test_vote_no_words(self):
        """
        Test voting without providing words, expecting a 400 error.
        """
        url = reverse("vote", args=[self.session.uuid])
        response = self.client.post(url, {"words": []}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
