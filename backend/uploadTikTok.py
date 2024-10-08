import yt_dlp
import whisper
import os

def download_tiktok(url, output):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': output.replace('.mp3', ''),
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
    except:
        print("Error downloading TikTok, please try again with different link.")

def transcribe_audio_with_whisper(file_path):
    # Load the Whisper model
    model = whisper.load_model("base")
    
    # Transcribe the audio file
    try:
        result = model.transcribe(file_path, fp16=False)
    except:
        print("Error transcribing audio, please try again.")
    os.remove(file_path)
    return result['text']

def upload_and_transcribe_tiktok(url):
    download_tiktok(url, 'tiktok_audio.mp3')
    transcription = transcribe_audio_with_whisper('tiktok_audio.mp3')
    return transcription

if __name__ == '__main__':
    transcription = upload_and_transcribe_tiktok('https://www.tiktok.com/t/ZP8eyUkv2/')
    print(transcription)