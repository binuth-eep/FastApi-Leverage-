FROM python:3.12-slim
WORKDIR /app
COPY requirements.lock.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt && useradd --uid 10001 --create-home learner
COPY app ./app
RUN mkdir /data && chown 10001:10001 /data
USER 10001
ENV DATABASE_URL=sqlite:////data/build-lab.db
EXPOSE 8000
HEALTHCHECK --interval=15s --timeout=4s --start-period=20s CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/api/ready')"
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
