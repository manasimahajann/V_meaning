from pydub import AudioSegment
import os

# Define the file path
mp3_path = "C:\\Dev\\javascript\\React\\Components\\aprilproject\\pyscript\\Stotra.mp3"
wav_path = "C:\\Dev\\javascript\\React\\Components\\aprilproject\\pyscript\\Stotra.wav"

# Convert MP3 to WAV (if necessary)
os.chdir("C:\\Dev\\javascript\\React\\Components\\aprilproject\\pyscript\\")
print("Converting MP3 to WAV...")
audio = AudioSegment.from_mp3(mp3_path)
audio.export(wav_path, format="wav")

# Load the WAV file
print("Loading WAV file...")
audio = AudioSegment.from_wav(wav_path)

# Define the segments you want to crop (in milliseconds)
segments = [
    (0, 10000),    # First 10 seconds
    (10000, 20000), # Next 10 seconds
    (20000, 30000), # Next 10 seconds
    # Add more segments as needed
]

# Ensure the output directory exists
output_dir = "C:\\Dev\\javascript\\React\\Components\\aprilproject\\pyscript"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Save each segment as a separate file
for i, (start, end) in enumerate(segments):
    segment = audio[start:end]
    output_path = os.path.join(output_dir, f"output_segment_{i+1}.wav")
    segment.export(output_path, format="wav")
    print(f"Saved segment {i+1} to {output_path}")

print("Audio segments have been saved.")
