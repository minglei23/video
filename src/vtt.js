
export function parseVTT(vttString) {
  const lines = vttString.split('\n');
  const subtitles = [];
  let currentSubtitle = null;

  lines.forEach(line => {
    if (line.includes('-->')) {
      const times = line.split(' --> ');
      if (times.length === 2) {
        currentSubtitle = {
          start: timeStringToSeconds(times[0].trim()),
          end: timeStringToSeconds(times[1].trim()),
          text: ''
        };
        subtitles.push(currentSubtitle);
      }
    } else if (currentSubtitle && line.trim()) {
      if (currentSubtitle.text) {
        currentSubtitle.text += '\n';
      }
      currentSubtitle.text += line.trim();
    }
  });

  return subtitles;
}

export function timeStringToSeconds(timeString) {
  const parts = timeString.split(':');
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseFloat(parts[2].replace(',', '.'));
  return (hours * 3600) + (minutes * 60) + seconds;
}
