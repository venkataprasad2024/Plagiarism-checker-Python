import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from PyPDF2 import PdfReader
import docx


def extract_text(file_path):
    ext = os.path.splitext(file_path)[1].lower()

    if ext == ".txt":
        with open(file_path, encoding="utf-8") as f:
            return f.read()

    elif ext == ".pdf":
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text

    elif ext == ".docx":
        doc = docx.Document(file_path)
        return "\n".join(p.text for p in doc.paragraphs)

    else:
        return ""


def compute_similarity(file_paths):
    texts = []
    names = []

    for path in file_paths:
        content = extract_text(path)
        if content.strip():   # skip empty files
            texts.append(content)
            names.append(os.path.basename(path))

    if len(texts) < 2:
        return []

    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform(texts).toarray()

    results = []

    for i in range(len(names)):
        for j in range(i + 1, len(names)):
            score = cosine_similarity(
                [vectors[i]], [vectors[j]]
            )[0][0]

            results.append({
                "docA": names[i],
                "docB": names[j],
                "score": round(score * 100, 2)
            })

    return results
