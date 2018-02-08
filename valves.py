# -*- coding: utf-8 -*-
"""
Created on Thu Feb 08 12:26:33 2018

@author: 9010553
"""

# tax rate 7% and easy difficulty

dR = 0
dC = 0
dI = 0

def calculate(_resPop, _comPop, _indPop):
    
    global dR, dC, dI
    
    tax = 7
    difficulty = 2
    
    taxTable = [200, 150, 120, 100, 80, 50, 30, 0, -10, -40, -100, -150, -200, -250, -300, -350, -400, -500, -550, -600]
    externalMarket = [1.2, 1.1, 0.98]
    
    resPop = _resPop
    comPop = _comPop
    indPop = _indPop
    
    resHis = [0]
    comHis = [0]
    indHis = [0]
    
    resHis[0] = resPop
    comHis[0] = comPop
    indHis[0] = indPop
    
    normResPop = float(resPop>>3)
    
    totPop = normResPop + comPop + indPop
    
    if normResPop > 0:
        employment = float(comHis[0] + indHis[0])/(normResPop)
    else:
        employment = 1.0
        
    prjResPop = normResPop + normResPop*(employment-1.0) + 0.02*normResPop
    
    if normResPop > 0:
        resRatio = float(prjResPop) / float(normResPop)
    else:
        resRatio = 1.3
    
    # working forces
    laborBase = 1.0
    
    if (comHis[0] + indHis[0]) > 0:
        laborBase = (resHis[0]/8.0)/float(comHis[0] + indHis[0])
        
    if laborBase > 1.3:
        laborBase = 1.3;
        
    internalMarket = totPop/3.7
    
    prjComPop = internalMarket*laborBase
    
    if comPop > 0:
        comRatio = prjComPop / comPop
    else:
        comRatio = prjComPop
        
    prjIndPop = externalMarket[difficulty]*laborBase*indPop
    prjIndPop = max(prjIndPop, 5.0)
    
    if indPop > 0:
        indRatio = prjIndPop / indPop
    else:
        indRatio = prjIndPop
    
    resRatio = min(resRatio, 2.0)
    comRatio = min(comRatio, 2.0)
    indRatio = min(indRatio, 2.0)
        
    dRes = 600*(resRatio-1) + taxTable[tax+difficulty]
    dCom = 600*(comRatio-1) + taxTable[tax+difficulty]
    dInd = 600*(indRatio-1) + taxTable[tax+difficulty]

    dR = dRes
    dC = dCom
    dI = dInd
#    
#    print('Res\tCom\tInd')
#    print('-------------------------')
#    print("{0:3.1f}".format(dRes) + '\t'+ "{0:3.1f}".format(dCom) + '\t' + "{0:3.1f}".format(dInd))
#    print(str(int(normResPop)) + '\t'+ str(comPop) + '\t' + str(indPop))
#    
    
def update():
    global dR, dC, dI
    return [dR, dC, dI]


calculate(8*8, 2, 6)