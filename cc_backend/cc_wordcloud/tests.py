"""
Tests for the cc_wordcloud app.
"""
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Session


class SessionTests(APITestCase):
    """
    Test case for the Session functionalities.
    """

    def setUp(self):
        """
        Clear the database before each test to ensure a clean state.
        """
        Session.objects.all().delete()

    def test_start_session(self):
        """
        Test that a session is created and its data is returned.
        """
        response = self.client.post(reverse('start-session'))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('uuid', response.data)
        self.assertIn('code', response.data)
        self.assertTrue(Session.objects.filter(uuid=response.data['uuid']).exists())
        self.assertTrue(len(response.data['code']) == 3)

    def test_start_session_sequential_ids(self):
        """
        Test that numeric IDs are assigned sequentially from '000' to '999'.
        """
        for i in range(5):
            response = self.client.post(reverse('start-session'))
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            self.assertEqual(response.data['code'], f"{i:03d}")

    def test_start_session_all_ids_used(self):
        """
        Test that an error is returned when all numeric IDs are used.
        """
        # Create the maximum number of sessions
        for i in range(1000):
            Session.objects.create(code=i)

        response = self.client.post(reverse('start-session'))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "All sessions are used, try later."})

    def test_end_session(self):
        """
        Test that a session can be deleted by its UUID.
        """
        session = Session.objects.create()
        response = self.client.delete(reverse('end-session', kwargs={'uuid': session.uuid}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Session.objects.filter(uuid=session.uuid).exists())

    def test_get_words_empty(self):
        """
        Test retrieving words for a session with no words.
        """
        session = Session.objects.create()
        response = self.client.get(reverse('get-words', kwargs={'uuid': session.uuid}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['words'], {})

    def test_get_words_with_data(self):
        """
        Test retrieving words for a session with added words.
        """
        session = Session.objects.create(words={'test': 2})
        response = self.client.get(reverse('get-words', kwargs={'uuid': session.uuid}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['words'], {'test': 2})

    def test_vote_add_word(self):
        """
        Test adding a new word to a session.
        """
        session = Session.objects.create()
        response = self.client.post(
            reverse('vote', kwargs={'uuid': session.uuid}),
            data={'word': 'example'},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        session.refresh_from_db()
        self.assertEqual(session.words, {'example': 1})

    def test_vote_increment_word(self):
        """
        Test incrementing the vote count for an existing word.
        """
        session = Session.objects.create(words={'example': 1})
        response = self.client.post(
            reverse('vote', kwargs={'uuid': session.uuid}),
            data={'word': 'example'},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        session.refresh_from_db()
        self.assertEqual(session.words, {'example': 2})

    def test_vote_no_word_provided(self):
        """
        Test voting without providing a word.
        """
        session = Session.objects.create()
        response = self.client.post(reverse('vote', kwargs={'uuid': session.uuid}))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)

    def test_get_session_by_code(self):
        """
        Test retrieving a session by its numeric ID.
        """
        session = Session.objects.create(code="001", words={'example': 2})
        response = self.client.get(
            reverse('get-session-by-numeric-id',
                    kwargs={'code': session.code}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['uuid'], str(session.uuid))
        self.assertEqual(response.data['code'], session.code)
        self.assertEqual(response.data['words'], session.words)