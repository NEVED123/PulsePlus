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
  resetSong,
  getFinalTempo,
  setFinalTempo,
  incrementMeter,
  decrementMeter,
  setRepetitions,
  getRepetitions,
  setSectionName,
  getSectionName,
  addMeter,
  removeMeter,
  getSongLength
} from "../logic/SongFunctions";
import { Meter, Beat, Song, Subdivisions} from "../logic/structure"
import {describe, expect, test} from "@jest/globals"
import _ from "lodash"

//NOTE: All Getters and setters return a modified shallow copy of the song object passed in.
//I thought this was against the rules, but it seems to be the correct way and I don't understand/
//why.For testing, we must make deep clones when reusing an object for a test so as to not
//change the original object. 

describe('getActiveMeter',()=>{

  test('returns active meter', ()=>{

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

    expect(getActiveMeter(received)).toEqual(result)
  })

 
  test('throws error when song contains no active meter', ()=>{

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
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(()=>{
      getActiveMeter(received)
    }).toThrow
  })
})

describe('getActiveMeterIndex',()=>{
  test('returns index of active meter',()=>{
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

    expect(getActiveMeterIndex(received)).toBe(0)
  })

  test('throws error when song contains no active meter',()=>{
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
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(()=>{
      getActiveMeterIndex(received)
    }).toThrow()
  })
})

describe('getActiveBeat', ()=>{
  test('returns the active beat',()=>{
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

    expect(getActiveBeat(received)).toEqual(result)
  })

  test('throws error when song contains no active beat', ()=>{
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
      getActiveBeat(received)
    }).toThrow()
  })
})

describe('getActiveBeatIndex',()=>{
  test('returns active beat Index of active meter',()=>{
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
        }
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(getActiveBeatIndex(received)).toBe(0)
  })

  test('throws error when song contains no active beat',()=>{
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
      getActiveBeatIndex(received)
    }).toThrow()
  })

})

describe('getNumerator',()=>{

  test('gets numerator = 1 from active meter', ()=>{
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
  
    expect(getNumerator(received)).toBe(1)
  })

  test('throws error when numerator = 0', ()=>{
    const received : Song = {
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
      getNumerator(received)
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
          active : false
      }
      ]
    }],
    repeat: true,
    name: "Default",
    author: "",
    date: ""
  }



  test('setNumerator from 1 to 32, resetAccents = true', ()=>{

    const numEquals32Clone = _.cloneDeep(numEquals32)
    const numEquals1Clone = _.cloneDeep(numEquals1)

    expect(setNumerator(numEquals1Clone, 32, true)).toEqual(numEquals32Clone);
  })

  test('setNumerator from 32 to 1, resetAccents = true', ()=>{

    const numEquals32Clone = _.cloneDeep(numEquals32)
    const numEquals1Clone = _.cloneDeep(numEquals1)

    expect(setNumerator(numEquals32Clone, 1, true)).toEqual(numEquals1Clone);
  })

  test('setNumerator from 1 to 32, resetAccents = false',()=>{

    const num1FirstAccent1 = _.cloneDeep(numEquals1)

    num1FirstAccent1.song[0].beats[0].beatSound = 1
  
    const num32FirstAccent1 = _.cloneDeep(numEquals32)
  
    num32FirstAccent1.song[0].beats[0].beatSound = 1  

    expect(setNumerator(num1FirstAccent1, 32, false)).toEqual(num32FirstAccent1)
  })

  test('setNumerator from 32 to 1, resetAccents = false',()=>{

    const num1FirstAccent1 = _.cloneDeep(numEquals1)

    num1FirstAccent1.song[0].beats[0].beatSound = 1
  
    const num32FirstAccent1 = _.cloneDeep(numEquals32)
  
    num32FirstAccent1.song[0].beats[0].beatSound = 1  

    expect(setNumerator(num32FirstAccent1, 1, false)).toEqual(num1FirstAccent1)
  })
})

describe('getDenominator',()=>{
  test('gets denominator from active meter', ()=>{
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

    expect(getDenominator(received)).toBe(4)
  })
})

describe('setDenominator', ()=>{
  test('sets denominator of active meter', ()=>{
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

    expect(setDenominator(received, 8)).toEqual(result)
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
            beatDuration: 600,  
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
            active : false
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

    expect(incrementBeat(received)).toEqual(result)

  })

  //loop back to beginning of meter if repeat

  //increment from one meter to the next if no repeat
  test('increment to next meter', ()=>{

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

    expect(incrementBeat(received)).toEqual(result)
    
  })

  //loop from end of last meter to beginning
  test('loop to beginning', ()=>{

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

    expect(incrementBeat(received)).toEqual(result)
  }) 
})

describe('getFinalTempo',()=>{
  test('Final tempo defined', ()=>{
    const received : Song = {
      song:[{
        initBpm: 100,
        finalBpm: 200,
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
              active : false
            }
          ]
        },
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }
    expect(getFinalTempo(received)).toBe(200)
  })
    
    test('Final tempo undefined', ()=>{
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
        ],
        repeat: true,
        name: "Default",
        author: "",
        date: ""
      }
  
      expect(getFinalTempo(received)).toEqual(100)
  })
})

describe('setFinalTempo',()=>{
  test('sets Final Tempo', ()=>{
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
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    const expected : Song = {
      song:[{
        initBpm: 100,
        finalBpm: 200,
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
              active : false
            }
          ]
        },
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(setFinalTempo(200, received)).toEqual(expected)
  })
})

describe('incrementMeter',()=>{
  test('loop to beginning',()=>{
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

    const expected : Song = {
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

    expect(incrementMeter(received, true)).toEqual(expected)
  })

  test('activeMeter is last meter, but not looping',()=>{
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

    expect(incrementMeter(received)).toEqual(received);
  })

  test('activeMeter is not last meter',()=>{
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

    const expected : Song = {
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

    expect(incrementMeter(received)).toEqual(expected)
  })
})

describe('decrementMeter',()=>{
  test('loop to end',()=>{
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

    const expected : Song = {
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

    expect(decrementMeter(received, true)).toEqual(expected)
  })

  test('activeMeter is the first meter, but not looping',()=>{
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

    expect(decrementMeter(received)).toEqual(received);
  })

  test('activeMeter is not the first meter',()=>{
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

    const expected : Song = {
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

    expect(decrementMeter(received)).toEqual(expected)
  })
})

describe('setRepetitions',()=>{
  test('sets reptition for active meter',()=>{
    const received: Song = {
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
              active : false
            }
          ]
        },
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    const expected: Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 10,
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
              active : false
            }
          ]
        },
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }

    expect(setRepetitions(10, received)).toEqual(expected)
  })
})

describe('getRepetitions',()=>{
  test('gets Repetitions of activeMeter',()=>{

    const received: Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 10,
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
              active : false
            }
          ]
        },
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }   
    
    expect(getRepetitions(received)).toEqual(10)
  })
})

describe('setSectionName',()=>{
  test('sets name of active meter',()=>{
    const received: Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 10,
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
              active : false
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 10,
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
    
    const expected: Song = {
      song:[{
        sectionName:'sectionName',
        initBpm: 100,
        denominator: 4,
        repeat : 10,
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
              active : false
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 10,
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

    expect(setSectionName('sectionName', received)).toEqual(expected)
  })
})

describe('getSectionName',()=>{
  test('gets section name from active meter',()=>{
    const received: Song = {
      song:[{
        sectionName:'sectionName',
        initBpm: 100,
        denominator: 4,
        repeat : 10,
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
              active : false
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 10,
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

    expect(getSectionName(received)).toEqual('sectionName')
  })
})

describe('addMeter',()=>{

    test('add meter after active meter, no Final bpm',()=>{
      const received: Song = {
        song:[{
          sectionName:'sectionName',
          initBpm: 100,
          denominator: 4,
          repeat : 10,
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
                active : false
              }
            ]
          },
          {
            initBpm: 100,
            denominator: 4,
            repeat : 10,
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
      
      const expected: Song = {
        song:[{
          sectionName: 'sectionName',
          initBpm: 100,
          denominator: 4,
          repeat : 10,
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
            repeat : 10,
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
                  active : false
                }
              ]
            },
          {
            initBpm: 100,
            denominator: 4,
            repeat : 10,
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

      expect(addMeter(received)).toEqual(expected)
    })

   test('active meter has final bpm',()=>{

    const received: Song = {
      song:[{
        sectionName:'sectionName',
        initBpm: 100,
        finalBpm:200,
        denominator: 4,
        repeat : 10,
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
              active : false
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 10,
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
  
    const expected: Song = {
      song:[{
        sectionName: 'sectionName',
        initBpm: 100,
        finalBpm:200,
        denominator: 4,
        repeat : 10,
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
          initBpm: 200,
          denominator: 4,
          repeat : 10,
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
                active : false
              }
            ]
          },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 10,
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

    expect(addMeter(received)).toEqual(expected)
  })
   
})

describe('removeMeter',()=>{
  test('song only has one meter, returns',()=>{
    const received: Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 10,
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
              active : false
            }
          ]
        },
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }  
  
    expect(removeMeter(received)).toEqual(received)
   })

   test('song is longer than one meter',()=>{

    const received: Song = {
      song:[{
        sectionName: 'sectionName',
        initBpm: 100,
        finalBpm:200,
        denominator: 4,
        repeat : 10,
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
          initBpm: 200,
          denominator: 4,
          repeat : 10,
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
                active : false
              }
            ]
          },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 10,
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

    const expected: Song = {
      song:[{
        sectionName:'sectionName',
        initBpm: 100,
        finalBpm:200,
        denominator: 4,
        repeat : 10,
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
              active : false
            }
          ]
        },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 10,
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
  
    expect(removeMeter(received)).toEqual(expected)
   })
})

describe('getSongLength',()=>{
  test('song is 1 meter long',()=>{
    const received: Song = {
      song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 10,
        active: true,
        beats:[{
              beatSound : 0,
              subDiv : Subdivisions.none,
              beatDuration: 600, // 60/100 * 1000 
              active : false
            },
          ]
        },
      ],
      repeat: true,
      name: "Default",
      author: "",
      date: ""
    }  
  
    expect(getSongLength(received)).toEqual(1)
   })

   test('song is more than 1 meter long',()=>{
    const received: Song = {
      song:[{
        sectionName: 'sectionName',
        initBpm: 100,
        finalBpm:200,
        denominator: 4,
        repeat : 10,
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
          initBpm: 200,
          denominator: 4,
          repeat : 10,
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
                active : false
              }
            ]
          },
        {
          initBpm: 100,
          denominator: 4,
          repeat : 10,
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

    expect(getSongLength(received)).toEqual(3)
   })
})