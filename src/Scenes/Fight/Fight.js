import $ from 'jquery'

// this guy needs to access the game properties to make modifications and all
class Fight  {
  constructor (game) {
    this.game = game
  }

  // this.attack is not a function?
  attack () {
    console.log('attacking')
  }

  beginFight () {
    const fight = $("<div></div>").addClass('combat-screen')
    const div = $(`
<div>
  <div class="fight-screen-head">
    <h1>Fight!</h1>
  </div> <!-- head -->
  <div  class="fight-screen-body">
    <div>
    <div  class="profile">
      <h3  class="player-name">Player One</h3>
      <figure>
        <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" alt="axe" />
      </figure>
    </div>
    <div class="actions">
      <div>
        <button class="attack-button" onclick="this.attack()">Attack</button>
        <button class="defense-button">Defend</button>
      </div>
    </div>
  </div> <!--- player-1 -->
  <div>
      <div  class="profile">
      <h3  class="player-name">Player One</h3>
      <figure>
        <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" alt="axe" />
      </figure>
    </div>
    <div class="actions">
      <div>
        <button class="attack-button" onclick=this.attack()>Attack</button>
        <button class="defense-button">Defend</button>
      </div>
    </div>
  </div> <!--- player-1 -->
  </div> <!-- body -->
</div>`).addClass('fight-screen')
    fight.html(div)
    return (
      fight
    )
  }
}

export default Fight
