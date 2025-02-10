export type Session = {
   session_id: string;
   session_code: string;
   words: Word[];
   created_at: string;
};

export type Word = {
   text: string;
   count: number;
};
