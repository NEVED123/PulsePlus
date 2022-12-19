import { 
  getActiveMeter, 
  getActiveMeterIndex, 
  getActiveBeat,
  getActiveBeatIndex,
  incrementBeat, 
  setNumerator, 
  getNumerator,
  getDenominator,
  setDenominator,
  setAccent,
  setTempo,
  getTempo,
  resetSong
} from "../logic/SongFunctions";
import { Meter, Beat, Song, Subdivisions} from "../logic/structure"
import {describe, expect, test} from "@jest/globals"
import _ from "lodash"



describe('getActiveMeter',()=>{

  test('getActiveMeter returns a deepclone of the active meter', ()=>{

    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : true
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(getActiveMeter(recieved)).not.toBe(recieved.song[0])

  })

  test('returns active meter', ()=>{

    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : true
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    const result : Meter = {
      initBpm: 100,
      denominator: 4,
      repeat : 1,
      active: true,
      beats:[{
          beatSound : 0,
          subDiv : Subdivisions.none,
          beatDuration: 600, // 60/100 * 1000 
          active : true
          }
        ]
      }

    expect(getActiveMeter(recieved)).toEqual(result)
  })

 
  test('throws error when song contains no active meter', ()=>{

    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: false,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : false
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(()=>{
      getActiveMeter(recieved)
    }).toThrow
  })
})

describe('getActiveMeterIndex',()=>{
  test('returns index of active meter',()=>{
    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : true
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(getActiveMeterIndex(recieved)).toBe(0)
  })

  test('throws error when song contains no active meter',()=>{
    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: false,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : false
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(()=>{
      getActiveMeterIndex(recieved)
    }).toThrow()
  })
})

describe('getActiveBeat', ()=>{
  test('returns the active beat',()=>{
    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    const result : Beat = {
      beatSound : 0,
      subDiv : Subdivisions.none,
      beatDuration: 600, // 60/100 * 1000 
      active : true
      }

    expect(getActiveBeat(recieved)).toEqual(result)
  })

  test('throws error when song contains no active beat', ()=>{
    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : false
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(()=>{
      getActiveBeat(recieved)
    }).toThrow()
  })
})

describe('getActiveBeatIndex',()=>{
  test('returns active beat Index of active meter',()=>{
    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(getActiveBeatIndex(recieved)).toBe(0)
  })

  test('throws error when song contains no active beat',()=>{
    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : false
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(()=>{
      getActiveBeatIndex(recieved)
    }).toThrow()
  })

})

describe('getNumerator',()=>{

  test('gets numerator = 1 from active meter', ()=>{
    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false
              }
            ]
          }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }
  
    expect(getNumerator(recieved)).toBe(1)
  })

  test('throws error when numerator = 0', ()=>{
    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(()=>{
      getNumerator(recieved)
    }).toThrow()
  })

})

describe('setNumerator', ()=>{

  const numEquals32 : Song = {
    song:[{
      initBpm: 100,
      denominator: 4,
      repeat : 1,
      active: true,
      beats:[{
          beatSound : 0,
          subDiv : Subdivisions.none,
          beatDuration: 600, // 60/100 * 1000 
          active : true
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      },
      {
        beatSound : 0,
        subDiv : Subdivisions.none,
        beatDuration: 600, // 60/100 * 1000 
        active : false
      }
      ]
    }],
    repeat: true,
    name: "Default",
    author: "",
    date: ""
  }
  
  const numEquals1 : Song = {
    song:[{
      initBpm: 100,
      denominator: 4,
      repeat : 1,
      active: true,
      beats:[{
          beatSound : 0,
          subDiv : Subdivisions.none,
          beatDuration: 600, // 60/100 * 1000 
          active : true
      }
      ]
    }],
    repeat: true,
    name: "Default",
    author: "",
    date: ""
  }

  const num1FirstAccent1 = _.cloneDeep(numEquals1)

  num1FirstAccent1.song[0].beats[0].beatSound = 1

  const num32FirstAccent1 = _.cloneDeep(numEquals32)

  num32FirstAccent1.song[0].beats[0].beatSound = 1  

  test('setNumerator returns a deepclone of song', ()=>{
    expect(setNumerator(numEquals1, 1)).not.toBe(numEquals1)
  })

  test('setNumerator from 1 to 32, resetAccents = true', ()=>{
    expect(setNumerator(numEquals1, 32, true)).toEqual(numEquals32);
  })

  test('setNumerator from 32 to 1, resetAccents = true', ()=>{
    expect(setNumerator(numEquals32, 1, true)).toEqual(numEquals1);
  })

  test('setNumerator from 1 to 32, resetAccents = false',()=>{
    expect(setNumerator(num1FirstAccent1, 32, false)).toEqual(num32FirstAccent1)
  })

  test('setNumerator from 32 to 1, resetAccents = false',()=>{
    expect(setNumerator(num32FirstAccent1, 1, false)).toEqual(num1FirstAccent1)
  })
})

describe('getDenominator',()=>{
  test('gets denominator from active meter', ()=>{
    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 2,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false
              }
            ]
          }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(getDenominator(recieved)).toBe(4)
  })
})

describe('setDenominator', ()=>{
  test('sets denominator of active meter', ()=>{
    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 2,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false
              }
            ]
          }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    const result : Song = {
      song:[{
        initBpm: 100,
        denominator: 8,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 2,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false
              }
            ]
          }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(setDenominator(recieved, 8)).toEqual(result)
  })
})

describe('setAccent', ()=>{

  test('increments accent on active meter from 0 to 1',()=>{
    const received : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false
              }
            ]
          }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }
  
    const result : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 1,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false
              }
            ]
          }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }
  
    expect(setAccent(received, 0)).toEqual(result)
  })

  test('loops accent number back to 0',()=>{
    const received : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 2,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false
              }
            ]
          }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }
  
    const result : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false
              }
            ]
          }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }
  
    expect(setAccent(received, 0)).toEqual(result)
  })

  test('throws error if given beat index does not exist in active meter',()=>{
    const received : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false
              }
            ]
          }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }
  
    expect(()=>{
      setAccent(received, 1)
    }).toThrow()
  })

})

describe('setTempo',()=>{
  test('set tempo for active meter',()=>{
    const received : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false
              }
            ]
          }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }
  
    const result : Song = {
      song:[{
        initBpm: 200,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 300,  
            active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, 
              active : false
              }
            ]
          }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(setTempo(received, 200)).toEqual(result)
  })
})

describe('getTempo',()=>{
  test('get tempo from active meter beat of active meter', ()=>{
      const received : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        },
        {
          initBpm: 200,
          denominator: 4,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 300, // 60/100 * 1000 
              active : false
              }
            ]
          }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(getTempo(received)).toBe(100)
  })
})

describe('resetSong',()=>{
  test('resets active meter and active beat',()=>{
    const received : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: false,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : false
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: true,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : true
              }
            ]
          }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    const result : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 1,
          active: false,
          beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false
              }
            ]
          }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(resetSong(received)).toEqual(result)
  })

})


describe('incrementBeat',()=>{

  //increment within meter
  test('increment within single meter', ()=>{

    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : true //CHANGED
            },
            {
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false //CHANGED
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    const result : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false //CHANGED
            },
            {
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : true //CHANGED
            }
          ]
        },
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(incrementBeat(recieved)).toEqual(result)

  })

  //loop back to beginning of meter if repeat

  //increment from one meter to the next if no repeat
  test('increment to next meter', ()=>{

    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false 
            },
            {
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : true
            }
          ]
        },
        {
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: false,
        beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false //CHANGED
            },
            {
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false //CHANGED
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    const result : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: false,
        beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false 
            },
            {
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false
            }
          ]
        },
        {
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : true
            },
            {
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false 
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(incrementBeat(recieved)).toEqual(result)
    
  })

  //loop from end of last meter to beginning
  test('loop to beginning', ()=>{

    const recieved : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: false,
        beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false 
            },
            {
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false
            }
          ]
        },
        {
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false 
            },
            {
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : true
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    const result : Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : true
            },
            {
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false
            }
          ]
        },
        {
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: false,
        beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false
            },
            {
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false 
            }
          ]
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(incrementBeat(recieved)).toEqual(result)
  }) 
})

