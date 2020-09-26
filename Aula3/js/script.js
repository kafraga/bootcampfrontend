var data = Array.from(document.querySelectorAll('.data'));
for (var i = 0; i < data.length; i++) {
  var currentElement = data[i];
  currentElement.classList.add('emphasis');
}
