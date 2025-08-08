import { costumersView, setupCostumers } from './views/admin_users.js';
import { newCostumerView, setupNewCostumer } from './views/admin_newuser.js'; 
// import { callsView, setupCalls } from './views/admin_calls.js';
// import { apptsView, setupAppts } from './views/admin_appts.js';

export function router() {
  const insertTo = document.getElementById('admin-content');
  const route = location.hash.slice(1);
  console.log('Current route:', route);

  switch (route) {
    case 'users':
      insertTo.innerHTML = costumersView();
      setupCostumers();
      break;
    case 'history_appts':
      alert('Insertar lógica para citas');
      break;
    case 'newuser':
      insertTo.innerHTML = newCostumerView();
      setupNewCostumer();
      break;
    default:
      insertTo.innerHTML = `<h1>404 - Página no encontrada</h1>`;
  }
}