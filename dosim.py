# -*- coding: utf-8 -*-
"""
Created on Thu Mar 29 10:11:41 2018

@author: 9010553
"""


# this is a prototype of simcity.

# set game constants
ZONECOST = 100

# objects
class city:
    def __init__(self,fund):
        self.fund = fund
        self.zones = []
        self.valves = [0, 0, 0]

    def planZone(self,type):
        if self.fund >= ZONECOST:
            newZone_ = zone(type,self)
            self.zones.append(newZone_)
        else:
            print('[S] not enough fund')
        
    def getLevel(self,type):
        num_ = 0
        for zone in self.zones:
            if zone.type == type:
                num_ += zone.level
                
        return num_
        
    def getValve(self):
        valves_ = [0, 0, 0]
        rLevel_ = self.getLevel(0)
        cLevel_ = self.getLevel(1)
        iLevel_ = self.getLevel(2)
        
        employment_ = (lambda r,c,i : (c+i)/r if r > 0 else 1.0)(rLevel_, cLevel_, iLevel_)
        laborBase_ = (lambda r,c,i: r/(c+i) if c+i > 0 else 1.0)(rLevel_, cLevel_, iLevel_)
        
        rRatio_ = min(employment_, 2.0)
        cRatio_ = min(laborBase_, 2.0)
        iRatio_ = min(laborBase_, 2.0)
        
        modifier_ = .1
        
        valves_[0] = modifier_ * rRatio_
        valves_[1] = modifier_ * cRatio_
        valves_[2] = modifier_ * iRatio_
        
        for i in range(3):
            self.valves[i] += valves_[i]
        
        return self.valves

class zone:
    def __init__(self,type,city):
        self.type = type
        self.level = 0
        self.city = city
        self.prob = [95, 80, 80]
        self.probMax = [170, 110, 110]
        self.probMin = [20, 50, 50]

    def getProb(self):
        valves_ = self.city.getValve()
        
        
    def do(self):
        
        
        

#game loop
key = ''
while key !='exit':
    key = raw_input("type anything ")
    print(key)
# Input
