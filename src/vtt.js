
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

export function encodeID(id) {
  let result = '';
  while (id > 0) {
    let charCode = 65 + (id % 26);
    result = String.fromCharCode(charCode) + result;
    id = Math.floor(id / 26);
  }
  while (result.length < 4) {
    result = 'A' + result;
  }
  return result;
};

export function decodeID(encoded) {
  let id = 0;
  for (let i = 0; i < encoded.length; i++) {
    id = id * 26 + (encoded.charCodeAt(i) - 65);
  }
  return id;
};
