# portfolio-smrithi: Flask app served by gunicorn
FROM python:3.12-slim
WORKDIR /app
COPY portfolio-smrithi/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY portfolio-smrithi/ ./
EXPOSE 8000
CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]
