const formEl = document.querySelector('.form');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(formEl);
  const amount = formData.get('withdrawAmount');
  console.log(amount);
});
