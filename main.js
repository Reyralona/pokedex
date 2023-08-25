
getapi('https://pokeapi.co/api/v2/pokemon/1').then((data => {console.log(data.sprites)}))

function title(str){
  return String(str.slice(0, 1)).toUpperCase() + str.slice(1, str.length)
}


async function getapi(url) {
  const response = await fetch(url);
  var data = await response.json();
  return data;
}

async function generateCard(url) {
  await getapi(url).then((data) => {
    /* sprites */
    //gen1
    let sprites_generation_i_red_blue = data.sprites.versions["generation-i"]["red-blue"].front_default
    let sprites_generation_i_yellow = data.sprites.versions["generation-i"]["yellow"].front_default
    //gen2
    let sprites_generation_ii_crystal = data.sprites.versions["generation-ii"]["crystal"].front_default
    let sprites_generation_ii_gold = data.sprites.versions["generation-ii"]["gold"].front_default
    let sprites_generation_ii_silver = data.sprites.versions["generation-ii"]["silver"].front_default
    //gen3
    let sprites_generation_iii_emerald = data.sprites.versions["generation-iii"]["emerald"].front_default
    let sprites_generation_iii_firered_leafgreen = data.sprites.versions["generation-iii"]["firered-leafgreen"].front_default
    let sprites_generation_iii_ruby_sapphire = data.sprites.versions["generation-iii"]["ruby-sapphire"].front_default
    //gen4
    let sprites_generation_iv_diamond_pearl = data.sprites.versions["generation-iv"]["diamond-pearl"].front_default
    let sprites_generation_iv_heartgold_soulsilver = data.sprites.versions["generation-iv"]["heartgold-soulsilver"].front_default
    let sprites_generation_iv_platinum = data.sprites.versions["generation-iv"]["platinum"].front_default
    //gen5
    let sprites_generation_v_black_white_default = data.sprites.versions["generation-v"]["black-white"].front_default
    let sprites_generation_v_black_white_animated = data.sprites.versions["generation-v"]["black-white"].animated.front_default
    //gen6
    let sprites_generation_vi_omegaruby_alphasapphire = data.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_default
    let sprites_generation_vi_x_y = data.sprites.versions["generation-vi"]["x-y"].front_default
    //gen7
    let sprites_generation_vii_icons = data.sprites.versions["generation-vii"]["icons"].front_default
    let sprites_generation_vii_ultra_sun_ultra_moon = data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_default
    //gen8
    let sprites_generation_viii_icons = data.sprites.versions["generation-viii"]["icons"].front_default
    //others
    let sprites_default = data.sprites.front_default
    let sprites_dream_world = data.sprites.other.dream_world.front_default
    let sprites_home = data.sprites.other.home.front_default
    let sprites_official_artwork = data.sprites.other["official-artwork"].front_default


    // get sprite
    let img = sprites_official_artwork
    // get id
    let id = "#" + String(data.id).padStart(4, "0");
    // get name
    let name = title(data.name);

    let cardtemplate = `
    <div class="card flex-col" data-aos="fade-left">
    <img src="${img}"/>
    <div class="cardid">${id}</div>
    <div class="cardpokename">${name}</div>
    <div class="cardtypes flex-row flex-spacebetween">`;

    // get types
    for (let i = 0; i < data.types.length; i++) {
      let type =  data.types[String(i)].type.name
      cardtemplate += `<div class="type-item type-${type}">${title(type)}</div>`;
    }

    cardtemplate += `</div></div>`
    
    document.querySelector(".container").insertAdjacentHTML('beforeend', cardtemplate)
  });
}

for(let i = 1; i < 100; i++){
  await generateCard(`https://pokeapi.co/api/v2/pokemon/${i}`);
}

