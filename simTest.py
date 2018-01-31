# -*- coding: utf-8 -*-
"""
Created on Fri Jan 26 15:33:37 2018

@author: 9010553
"""

import matplotlib.pyplot as plt
import random as rnd
import math

# tPop is the population of a residential tile
# 1 residential zone has 8 residential tiles
# tPop has 4 grades. 1st grade means 16 sims in the tile
tPops = [16, 24, 32, 40]

# trf is the traffic status between the residential zone and a commercial zone
# -1 when the R-zone has no perimental road
# 0 when there's no C-Zone connected with the R-Zone
# 1 when it's found the C-Zone connected with the R-Zone
trfs = [-1, 0 ,1]

# LandValue is calculated from the difference between lValue and pValue
# lValue is possible to have the value in range 1 to 250
# pValue is in the range 0 to 255
# the difference is capped at 30, 80, 150
LandValues = [0, 1, 2, 3]

# the range of locValve is -3,000 to 3,000
# the range of resValve is -2,000 to 2,000
locValve = 0
resValve = 0

# the number of the occupied tiles in the R-Zone
occupied = 0

# Global populations of the residential
resPop = 0

class res:
    def __init__(self, Pop, road, LandValue, locValve, resValve):
        self.Pop = Pop
        self.road = road
        self.connected = True
        self.trf = 1
        self.LandValue = LandValue
        self.lValue = 0
        self.pValue = 0
        self.locValve = locValve
        self.resValve = resValve
        self.occupied = 0
        self.tile = False
        
    def reset(self, Pop, road, LandValue, locValve, resValve):
        self.Pop = Pop
        self.road = road
        self.connected = True
        self.trf = 1
        self.LandValue = LandValue
        self.lValue = 0
        self.pValue = 0
        self.locValve = locValve
        self.resValve = resValve
        self.occupied = 0
        self.tile = False
        
    def doResIn(self, tPop):
        if self.occupied == 8:
            self.tile = True
            
        if not self.tile:
            if self.occupied < 8:
                self.occupied += 1
                return
            return

        if self.Pop < 3:
            self.Pop += 1
        
    def doResOut(self, pop):
        if pop > 16:
            self.Pop -= 1
            return
        if pop == 16:
            self.tile = False
            return
        if pop < 16 and self.occupied > 0:
            self.occupied -= 1;
        
    def sim(self):
        global resPop
        
        # is this tile occupied?
        if not self.tile:
            tPop = self.occupied
        else:
            tPop = tPops[self.Pop]
            
        resPop += tPop
        
        if tPop > rnd.randrange(0,35):
            if self.road:
                if self.connected:
                    self.trf = trfs[2]
                else:
                    self.trf = trfs[1]
            else:
                self.trf = trfs[0]

        if self.trf == -1:
            self.doResOut()
            
        zscore = self.locValve + self.resValve
        
        if not self.tile or rnd.randrange(0,7) % 8 != 0:
            if zscore > -350 and (zscore - 26380) > rnd.randrange(-32767,32767):
                self.doResIn(tPop)
                return
            if zscore < 350 and (zscore + 26380) < rnd.randrange(-32767,32767):
                self.doResOut(tPop)
            
tiles = []
for i in range(0,7):
    tiles.append(res(0, True, 0, -3000, 0))

arc = []    

# sim 48 step is a year

for k in range(10):
    employment = []
    occ_hist = []
    hist = []
    months = []
    pMon = []

    tiles[0].reset(0, True, 0, 400, 0)

    for n in range(48):
        resPop = 0
        
        tiles[0].sim()
        
        pMon.append(tiles[0].Pop)
        hist.append(resPop)
        normResPop = math.floor(resPop/8.0)
        employment.append(1*normResPop)
        months.append(n)
    
#    plt.plot(months,pMon)
    plt.plot(months,hist)
#    arc.append(hist)
#    plt.plot(months,occ_hist)
#    plt.plot(months,employment)
    
plt.show()

dis = []
#num = []
#for n in range(100):
#    num.append(n)
#    dis.append(arc[n][48-1])
#
#plt.step(num,dis)
#plt.show()
#
#howmany = 0
#for i in range(len(dis)-1):
#    if dis[i] >= 8:
#        howmany += 1
#print(howmany)

