# -*- coding: utf-8 -*-
"""
Created on Thu Feb 08 14:00:13 2018

@author: 9010553
"""
import matplotlib.pyplot as plt
import valves
import random as rnd



resHis = [0]
normResHis = [0]
comHis = [0]
indHis = [0]
totHis = [0]
rValve = [0]
cValve = [0]
iValve = [0]
vOut = []
time = [0]
tax = [0]
avgLandValue = 80.0
employ = [0]

for i in range(2000):
    # calculating valves
    valves.calculate(resHis[i], comHis[i], indHis[i])
    vOut = valves.update()
    
    if rValve[i]+vOut[0] > 2000:
        rValve.append(2000)
    elif rValve[i]+vOut[0] < -2000:
        rValve.append(-2000)
    else:
        rValve.append(rValve[i]+vOut[0])
        
    if cValve[i]+vOut[1] > 1500:
        cValve.append(1500)
    elif cValve[i]+vOut[1] < -1500:
        cValve.append(-1500)
    else:
        cValve.append(cValve[i]+vOut[1])
        
    if iValve[i]+vOut[2] > 1500:
        iValve.append(1500)
    elif iValve[i]+vOut[2] < -1500:
        iValve.append(1500)
    else:
        iValve.append(iValve[i]+vOut[2])
    
    # check valves
#    if vOut[0] > 0:
#        resHis.append(resHis[i]+8)
#    elif vOut[0] == 0:
#        resHis.append(resHis[i])
#    elif vOut[0] < 0:
#        if resHis[i] > 0:
#            resHis.append(resHis[i]-8)
#        else:
#            resHis.append(resHis[i])
#    
#    normResHis.append(resHis[i+1]/8)
#        
#    if vOut[1] > 0:
#        comHis.append(comHis[i]+1)
#    elif vOut[1] == 0:
#        comHis.append(comHis[i])
#    elif vOut[1] < 0:
#        if comHis[i] > 0:
#            comHis.append(comHis[i]-1)
#        else:
#            comHis.append(comHis[i])    
#        
#    if vOut[2] > 0:
#        indHis.append(indHis[i]+1)
#    elif vOut[2] == 0:
#        indHis.append(indHis[i])
#    elif vOut[2] < 0:
#        if indHis[i] > 0:
#            indHis.append(indHis[i]-1)
#        else:
#            indHis.append(indHis[i])

    resZScore = int(min(avgLandValue*32,6000)-3000 + rValve[i+1])
#    if resZScore > -350 & (resZScore - 26380) > rnd.randrange(-32767,32767):
    if resZScore > -350:
        resHis.append(resHis[i]+8)
        print(str(i) + 'th up, res')

#    elif resZScore < 350 & (resZScore + 26380) < rnd.randrange(-32767,32767):
    elif resZScore < 350:
        if resHis[i] > 0:
            resHis.append(resHis[i]-8)
            print(str(i) + 'th down, res')
        else:
            resHis.append(resHis[i])
    else:
            resHis.append(resHis[i])
            
    normResHis.append(resHis[i+1]/8)
        
    comZScore = int(cValve[i+1])
#    if comZScore > -350 & (comZScore - 26380) > rnd.randrange(-32767,32767):
    if comZScore > -350:
        comHis.append(comHis[i]+1)
        print(str(i) + 'th up, com')
#    elif comZScore < 350 & (comZScore + 26380) < rnd.randrange(-32767,32767):
    elif comZScore < 350:        
        if comHis[i] > 0:
            comHis.append(comHis[i]-1)
            print(str(i) + 'th down, com')
        else:
            comHis.append(comHis[i])
    else:
            comHis.append(comHis[i])    
    
    indZScore = int(iValve[i+1])
#    if indZScore > -350 & (indZScore - 26380) > rnd.randrange(-32767,32767):
    if indZScore > -350:
        indHis.append(indHis[i]+1)
        print(str(i) + 'th up, ind')
#    elif indZScore < 350 & (indZScore + 26380) < rnd.randrange(-32767,32767):
    elif indZScore < 350:
        if indHis[i] > 0:
            indHis.append(indHis[i]-1)
            print(str(i) + 'th down, ind')
        else:
            indHis.append(indHis[i])
    else:
            indHis.append(indHis[i])
        
    time.append(i+1)
    totHis.append(resHis[i]/8+comHis[i]+indHis[i])
    tax.append(totHis[i+1]*avgLandValue*7/120.0)
    if resHis[i] > 0:
        employ.append(float(comHis[i]+indHis[i])/float(resHis[i]/8.0))
    else:
        employ.append(1)
        
#plt.step(time,normResHis, label='R-Zone')
plt.step(time,comHis, label='C-Zone')
plt.step(time,indHis, label='I-Zone')
#plt.step(time,totHis)
plt.legend(ncol=1, loc='upper left')
plt.show()

#plt.step(time,tax)
plt.step(time,totHis)
plt.show()

#plt.step(time,employ)
#plt.show()

plt.plot(rValve)
#plt.plot(cValve)
#plt.plot(iValve)
plt.show()