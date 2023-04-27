export function beatDuration(initBpm : number, finalBpm? : number, xValue? : number, finalXValue? : number,  accel : number=0) : number {
    if(finalBpm == undefined && accel == 0){
        return 60000/initBpm
    }

    if(xValue == undefined || finalXValue == undefined){
        throw new Error('need to give x values if specifying finalBpm')
    }

    const x_0 = 0
    const y_0 = initBpm
    const x_2 = finalXValue
    const y_2 = finalBpm == undefined ? initBpm : finalBpm
    const x_1 = (accel + 1) * (x_0 + x_2)/2
    const y_1 = (y_0 + y_2)/2
    const B_x = xValue

    const B_y = (x_0**2 * y_2 
        + 2 * x_1 * y_0 * Math.sqrt(x_0 * B_x - x_0 * x_2 + x_1**2 - 2 * x_1 * B_x + B_x * x_2) 
        - 2 * x_2* y_0 * Math.sqrt(x_0 * B_x- x_0 * x_2+ x_1**2 - 2 * x_1 * B_x+ B_x* x_2) 
        - 2 * x_0 * y_1 * Math.sqrt(x_0 * B_x- x_0 * x_2+ x_1**2 - 2 * x_1* B_x+ B_x * x_2)
        + 2 * x_2 * y_1 * Math.sqrt(x_0 * B_x- x_0 * x_2+ x_1**2 - 2 * x_1* B_x+ B_x * x_2) 
        + 2 * x_0 * y_2 * Math.sqrt(x_0 * B_x- x_0 * x_2+ x_1**2 - 2 * x_1* B_x+ B_x* x_2) 
        - 2 * x_1 * y_2 * Math.sqrt(x_0 * B_x- x_0 * x_2+ x_1**2 - 2 * x_1* B_x+ B_x* x_2) 
        - 2 * x_0 * x_1 * y_1 - 2 * x_0 * x_1 * y_2 + x_0 * B_x * y_0 - 2 * x_0 * B_x * y_1 + x_0 * B_x * y_2 
        - x_0 * x_2 * y_0 + 4 * x_0  * x_2 * y_1 - x_0  * x_2 * y_2 + 2 * x_1**2 * y_0 + 2 * x_1**2 * y_2 
        - 2 * x_1 * B_x * y_0 + 4 * x_1 * B_x * y_1 - 2 * x_1 * B_x * y_2 - 2 * x_1 * x_2 * y_0 
        - 2 * x_1* x_2 * y_1 + B_x * x_2 * y_0 - 2 * B_x * x_2 * y_1 + B_x * x_2 * y_2 + x_2**2 * y_0)/(x_0 - 2 * x_1+ x_2)**2
    
    console.log(B_y)
    return B_y
}


/*

t = (sqrt(x_0 * B_x - x_0 * x_2 + pow(x_1,2) - 2*x_1*B_x+B_x*x_2) + x_0 - x_1)/(x_0 - 2 * x_1 * x_2)

Idk if ty_2is will be useful but ty_2x mr x_0lpy_2x_0
B_y = (x_0^2 y_2 
+ 2 x_1y_0 sqrt(x_0 B_x- x_0 x_2+ x_1^2 - 2 x_1B_x+ B_xx_2) 
- 2 x_2y_0 sqrt(x_0 B_x- x_0 x_2+ x_1^2 - 2 x_1B_x+ B_xx_2) 
- 2 x_0 y_1 sqrt(x_0 B_x- x_0 x_2+ x_1^2 - 2 x_1B_x+ B_xx_2)
+ 2 x_2y_1 sqrt(x_0 B_x- x_0 x_2+ x_1^2 - 2 x_1B_x+ B_xx_2) 
+ 2 x_0 y_2 sqrt(x_0 B_x- x_0 x_2+ x_1^2 - 2 x_1B_x+ B_xx_2) 
- 2 x_1y_2 sqrt(x_0 B_x- x_0 x_2+ x_1^2 - 2 x_1B_x+ B_xx_2) 
- 2 x_0 x_1y_1 - 2 x_0 x_1y_2 + x_0 B_xy_0 - 2 x_0 B_xy_1 + x_0 B_xy_2 
- x_0 x_2y_0 + 4 x_0 x_2y_1 - x_0 x_2y_2 + 2 x_1^2 y_0 + 2 x_1^2 y_2 
- 2 x_1B_xy_0 + 4 x_1B_xy_1 - 2 x_1B_xy_2 - 2 x_1x_2y_0 
- 2 x_1x_2y_1 + B_xx_2y_0 - 2 B_xx_2y_1 + B_xx_2y_2 + x_2^2 f)/(x_0 - 2 x_1+ x_2)^2

B_y = (x_0^2 y_2 
+ 2 x_1y_0 sqrt(x_0 B_x- x_0 x_2+ x_1^2 - 2 x_1B_x+ B_xx_2) 
- 2 x_2y_0 sqrt(x_0 B_x- x_0 x_2+ x_1^2 - 2 x_1B_x+ B_xx_2) 
- 2 x_0 y_1 sqrt(x_0 B_x- x_0 x_2+ x_1^2 - 2 x_1B_x+ B_xx_2)
+ 2 x_2y_1 sqrt(x_0 B_x- x_0 x_2+ x_1^2 - 2 x_1B_x+ B_xx_2) 
+ 2 x_0 y_2 sqrt(x_0 B_x- x_0 x_2+ x_1^2 - 2 x_1B_x+ B_xx_2) 
- 2 x_1y_2 sqrt(x_0 B_x- x_0 x_2+ x_1^2 - 2 x_1B_x+ B_xx_2) 
- 2 x_0 x_1y_1 - 2 x_0 x_1y_2 + x_0 B_xy_0 - 2 x_0 B_xy_1 + x_0 B_xy_2 
- x_0 x_2y_0 + 4 x_0 x_2y_1 - x_0 x_2y_2 + 2 x_1^2 y_0 + 2 x_1^2 y_2 
- 2 x_1B_xy_0 + 4 x_1B_xy_1 - 2 x_1B_xy_2 - 2 x_1x_2y_0 
- 2 x_1x_2y_1 + B_xx_2y_0 - 2 B_xx_2y_1 + B_xx_2y_2 + x_2^2 f)/(x_0 - 2 x_1+ x_2)^2
    
G = (a^2 h 
+ 2 b f sqrt(a B - a c + b^2 - 2 b B + B c) 
- 2 c f sqrt(a B - a c + b^2 - 2 b B + B c) 
- 2 a g sqrt(a B - a c + b^2 - 2 b B + B c) 
+ 2 c g sqrt(a B - a c + b^2 - 2 b B + B c) 
+ 2 a h sqrt(a B - a c + b^2 - 2 b B + B c) 
- 2 b h sqrt(a B - a c + b^2 - 2 b B + B c) 
- 2 a b g - 2 a b h + a B f - 2 a B g + a B h 
- a c f + 4 a c g - a c h + 2 b^2 f + 2 b^2 h 
- 2 b B f + 4 b B g - 2 b B h - 2 b c f 
- 2 b c g + B c f - 2 B c g + B c h + c^2 f)/(a - 2 b + c)^2
*/