from typing import List, Optional, Any, Union, Dict
from pydantic import BaseModel, ConfigDict
from enum import Enum

class ExerciseType(str, Enum):
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE"
    WORD_BANK = "WORD_BANK"
    MATCH_PAIRS = "MATCH_PAIRS"
    FILL_BLANK = "FILL_BLANK"
    TYPE_ANSWER = "TYPE_ANSWER"

# --- Option & Pair items ---
class OptionItem(BaseModel):
    id: str
    text: str

class PairItem(BaseModel):
    left: str
    right: str

# --- Payload Models (Stored in Exercise.data) ---
class MultipleChoiceData(BaseModel):
    options: List[OptionItem]
    correct_option: str

class WordBankData(BaseModel):
    prompt_translation: Optional[str] = None
    options: List[str]
    correct_sequence: List[str]

class MatchPairsData(BaseModel):
    pairs: List[PairItem]

class FillBlankData(BaseModel):
    sentence_with_blank: str
    options: List[str]
    correct_option: str

class TypeAnswerData(BaseModel):
    accepted_answers: List[str]

# --- Answer Submission Payload Models ---
class MultipleChoiceAnswer(BaseModel):
    option_id: str

class WordBankAnswer(BaseModel):
    sequence: List[str]

class MatchPairsAnswer(BaseModel):
    pairs: List[PairItem]

class FillBlankAnswer(BaseModel):
    selected_word: str

class TypeAnswerAnswer(BaseModel):
    text: str

class ExerciseAnswerSubmission(BaseModel):
    answer: Union[MultipleChoiceAnswer, WordBankAnswer, MatchPairsAnswer, FillBlankAnswer, TypeAnswerAnswer, Dict[str, Any]]

# --- API Response Models ---
class ExerciseResponse(BaseModel):
    id: int
    lesson_id: int
    type: ExerciseType
    prompt: str
    data: Dict[str, Any]  # Sanitized to hide correct_option / correct_sequence when serving to frontend if needed
    order_index: int

    model_config = ConfigDict(from_attributes=True)

class AnswerFeedbackResponse(BaseModel):
    correct: bool
    feedback: str
    correct_answer: Optional[str] = None
    hearts_remaining: int
