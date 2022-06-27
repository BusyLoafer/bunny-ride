export const btnPlay = {
  imageNames: {
    base: "btnPlayBase",
    hover: "btnPlayHover",
    active: "btnPlayActive"
  },
  fileNames: {
    base: "play_button_active.png",
    hover: "play_button_hover.png",
    active: "play_button_press.png"
  }
}
export const btnLeader = {
  imageNames: {
    base: "btnLeaderBase",
    hover: "btnLeaderHover",
    active: "btnLeaderActive"
  },
  fileNames: {
    base: "leadboard_button_active.png",
    hover: "leadboard_button_hover.png",
    active: "leadboard_button_press.png"
  }
}

export const btnPause = {
  imageNames: {
    base: "btnPauseBase",
    hover: "btnPauseHover",
    active: "btnPauseActive"
  },
  fileNames: {
    base: "btn_pause_active.png",
    hover: "btn_pause_hover.png",
    active: "btn_pause_press.png"
  }
}
export const btnSoundOff = {
  imageNames: {
    base: "btnSoundOffBase",
    hover: "btnSoundOffHover",
    active: "btnSoundOffActive"
  },
  fileNames: {
    base: "btn_sound_0_active.png",
    hover: "btn_sound_0_hover.png",
    active: "btn_sound_0_press.png"
  }
}
export const btnSoundOn = {
  imageNames: {
    base: "btnSoundOnBase",
    hover: "btnSoundOnHover",
    active: "btnSoundOnActive"
  },
  fileNames: {
    base: "btn_sound_1_active.png",
    hover: "btn_sound_1_hover.png",
    active: "btn_sound_1_press.png"
  }
}
export const btnFullscreen = {
  imageNames: {
    base: "btnFsBase",
    hover: "btnFsHover",
    active: "btnFsActive"
  },
  fileNames: {
    base: "btn_fullscreen_active.png",
    hover: "btn_fullscreen_hover.png",
    active: "btn_fullscreen_press.png"
  }
}
export const btnLogin = {
  imageNames: {
    base: "btnMiBase",
    hover: "btnMiHover",
    active: "btnMiActive"
  },
  fileNames: {
    base: "login_button_active.png",
    hover: "login_button_hover.png",
    active: "login_button_press.png"
  }
}
export const btnArrow = {
  imageNames: {
    base: "btnArrowBase",
    hover: "btnArrowHover",
    active: "btnArrowActive"
  },
  fileNames: {
    base: "arrow_btn_active.png",
    hover: "arrow_btn_hover.png",
    active: "arrow_btn_press.png"
  }
}
export const btnOk = {
  imageNames: {
    base: "btnOkBase",
    hover: "btnOkHover",
    active: "btnOkActive"
  },
  fileNames: {
    base: "ok_button_active.png",
    hover: "ok_button_hover.png",
    active: "ok_button_press.png"
  }
}
export const allBtns = [
  btnPlay,
  btnLeader,
  btnPause,
  btnSoundOff,
  btnSoundOn,
  btnFullscreen,
  btnLogin,
  btnArrow,
  btnOk
]
export const upRightMenuBtns = [btnFullscreen, btnSoundOn, btnSoundOff, btnPause]


export type User = {
  sound: boolean,
  currentScore: number,
  bestScore: number,
  coins: number,
  id: number,
}