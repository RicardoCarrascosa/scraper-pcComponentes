const peticion = async () => {
  const res = await fetch('http://localhost:3000/api/v1/laptop')
  const laptops = await res.json()

  render(laptops)
}

const render = (laptops) => {
  const drawArea = document.querySelector('#drawArea')
  for (let i = 0; i < 42; i++) {
    const laptop = laptops[i]
    drawArea.innerHTML += `
    <div class = 'laptop'>
    <img src="${laptop.img}"/>
    <h3>${laptop.name}</h3>
    <p>${laptop.price}</p>
    <div>
    `
  }
  console.log(laptop.img)
}

peticion()
