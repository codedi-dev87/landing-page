const numeroWhatsApp = '5521998345182';

async function enviarLead(nome, email, telefone) {
  // Envia para o make —  HubSpot salva o lead
  await fetch('https://hook.eu1.make.com/2q66xm1c8kvvl2m8cordg6qfbaap6c88', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, telefone })
  });

  // Envia para o Formspree como backup
  await fetch('https://formspree.io/f/mwvazqgv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, telefone })
  });

  // Dispara evento de Lead para o Meta Pixel
  fbq('track', 'Lead');

  // Abre o WhatsApp com os dados
  const mensagem = `Olá! Tenho interesse no Estação Botafogo.
Nome: ${nome}
E-mail: ${email}
Telefone: ${telefone}`;
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

// Formulário do hero
document.getElementById('formLead').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome     = document.getElementById('nome').value;
  const email    = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  enviarLead(nome, email, telefone);
});

// Formulário da seção contato
document.getElementById('formContato').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome     = document.getElementById('nome2').value;
  const email    = document.getElementById('email2').value;
  const telefone = document.getElementById('telefone2').value;
  enviarLead(nome, email, telefone);
});

// Lightbox
function abrirLightbox(img) {
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox').classList.add('ativo');
}

function fecharLightbox() {
  document.getElementById('lightbox').classList.remove('ativo');
}

// Fechar com tecla ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') fecharLightbox();
});