const attendance = [35, 65, 110, 165, 220, 245, 200, 155, 110, 75, 48, 30, 18, 12, 7, 5];
const events = [
  { id: 'volleyball', sport: 'Women’s volleyball', matchup: 'BYU vs. Canyon State', time: '7:00 PM · Smith Fieldhouse' },
  { id: 'swimming', sport: 'Swimming & diving', matchup: 'Blue & White Invitational', time: '2:00 PM · Richards Building Pool' },
  { id: 'soccer', sport: 'Women’s soccer', matchup: 'BYU vs. Mountain Valley', time: '6:00 PM · South Field' },
  { id: 'cross-country', sport: 'Cross country', matchup: 'Cougar Fall Meet', time: '9:00 AM · Provo' },
];
let count = 6;
const checkedIn = new Set();
const total = attendance.reduce((sum, n) => sum + n, 0);
const eventList = document.querySelector('#event-list');
const confirmButton = document.querySelector('#confirm');

function chartMarkup() {
  const max = Math.max(...attendance);
  const rows = attendance.map((students, events) => ({ students, events })).reverse();
  return `<div class="horizontal-chart"><div class="chart-column-headings"><span>Events attended</span><span>Number of students →</span></div><p class="chart-direction">↑ More events attended</p><ol class="chart-rows">${rows.map(({ students, events }) => `<li class="chart-row${events === count ? ' your-row' : ''}" aria-label="${events} events: ${students} students${events === count ? ', your position' : ''}"><span class="bucket-label">${events}${events === count ? ' · You' : ''}</span><span class="bar-track"><span class="horizontal-bar" style="width:${students / max * 100}%"></span></span><span class="bucket-count">${students}</span></li>`).join('')}</ol><p class="chart-direction">↓ Fewer events attended</p></div>`;
}

function renderStanding() {
  document.querySelectorAll('[data-count]').forEach(el => el.textContent = count);
  document.querySelectorAll('[data-total]').forEach(el => el.textContent = total.toLocaleString());
  document.querySelector('#full-chart').innerHTML = chartMarkup();
  const below = attendance.slice(0, count).reduce((sum, n) => sum + n, 0);
  const above = attendance.slice(count + 1).reduce((sum, n) => sum + n, 0);
  document.querySelector('#standing-summary').innerHTML = `<div class="standing-stat"><strong>${above.toLocaleString()}</strong><div><span>People ahead of you</span><small>Attended more than ${count} events</small></div></div><div class="standing-stat same-level"><strong>${(attendance[count] - 1).toLocaleString()}</strong><div><span>People at your level</span><small>Also attended ${count} events · Not including you</small></div></div><div class="standing-stat"><strong>${below.toLocaleString()}</strong><div><span>People behind you</span><small>Attended fewer than ${count} events</small></div></div>`;
  document.querySelector('#distribution-summary').innerHTML = `<p><strong>${below.toLocaleString()}</strong>students attended fewer events</p><p><strong>${attendance[count].toLocaleString()}</strong>at ${count} events, including you</p><p><strong>${above.toLocaleString()}</strong>students attended more events</p>`;
}

function renderEvents() {
  eventList.innerHTML = events.map(event => `<label class="event-option"><input type="radio" name="event" value="${event.id}" ${checkedIn.has(event.id) ? 'disabled' : ''}><span><strong>${event.sport}${checkedIn.has(event.id) ? ' · Checked in ✓' : ''}</strong><small>${event.matchup}<br>Sep 16 · ${event.time}</small></span></label>`).join('');
}

function showScreen(name, focus = true) {
  if (!['standing', 'checkin', 'distribution'].includes(name)) name = 'standing';
  document.querySelectorAll('.screen').forEach(screen => screen.hidden = screen.id !== name);
  document.title = `${{ standing: 'My Standing', checkin: 'Check In', distribution: 'Full Distribution' }[name]} · BYU attendance prototype`;
  if (focus) {
    document.querySelector(`#${name} h1`).focus();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

document.querySelectorAll('[data-nav]').forEach(button => button.addEventListener('click', () => {
  const destination = button.dataset.nav;
  if (location.hash === `#${destination}`) showScreen(destination);
  else location.hash = destination;
}));
window.addEventListener('hashchange', () => showScreen(location.hash.slice(1)));
eventList.addEventListener('change', () => {
  confirmButton.disabled = false;
  document.querySelector('#selection-help').textContent = 'Ready? Confirm to add this event to your attendance.';
});
document.querySelector('#checkin-form').addEventListener('submit', event => {
  event.preventDefault();
  const selected = new FormData(event.currentTarget).get('event');
  const selectedEvent = events.find(item => item.id === selected);
  if (!selectedEvent || checkedIn.has(selected)) return;
  checkedIn.add(selected);
  const previous = count;
  attendance[count] -= 1;
  count += 1;
  attendance[count] += 1;
  renderStanding();
  renderEvents();
  document.querySelector('#preview-title').textContent = 'Check-in confirmed.';
  confirmButton.disabled = true;
  document.querySelector('#checkin-status').textContent = `Checked in to ${selectedEvent.sport}. ${previous} → ${count} events. Your attendance has been updated.`;
  document.querySelector('#selection-help').textContent = checkedIn.size === events.length ? 'You’ve checked in to every sample event.' : 'Attendance updated. Select another event to check in again.';
  const preview = document.querySelector('.preview-count');
  preview.classList.remove('pulse');
  void preview.offsetWidth;
  preview.classList.add('pulse');
});
renderEvents();
renderStanding();
showScreen(location.hash.slice(1), false);
