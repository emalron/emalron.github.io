# -*- coding: utf-8 -*-
"""
Created on Tue Mar 20 10:09:08 2018

@author: 9010553
"""

import random as rand

#setting
ZONE_COST = 100
MAX_RES_DEMAND = 218557

class city:
    def __init__(self, fund):
        self.budget = fund
        self.zones = []
        self.taxrate = 7
        self.rvalve = 1000
        self.cvalve = 1000
        self.ivalve = 1000
        self.rPop = 0
        self.cPop = 0
        self.iPop = 0
        
        
    def planZone(self, type):
        if self.budget > ZONE_COST:
            self.budget -= ZONE_COST
            newZone_ = zone(type, self)
            self.zones.append(newZone_)
            print("new zone is added")
        else:
            print("not enough budget")
            
            
    def displayCity(self):
        rci_ = self.countZones()
        
        print("city's budget: " + str(self.budget))
        print('R-Zones: ' + str(rci_['r']))
        print('C-Zones: ' + str(rci_['c']))
        print('I-Zones: ' + str(rci_['i']))
        
        
    def countZones(self):
        rnum_ = 0
        cnum_ = 0
        inum_ = 0
        
        for i in self.zones:
            if i.type == 'r':
                rnum_ += 1
            elif i.type == 'c':
                cnum_ += 1
            elif i.type == 'i':
                inum_ += 1
        
        return {'r': rnum_, 'c': cnum_, 'i': inum_}


    def censusPopulation(self):
        population_ = 0
        
        for i in self.zones:
            population_ += i.level
            
        return population_
        
        
    def censusLandValue(self):
        landValue_ = 0
        
        for i in self.zones:
            landValue_ += i.landValue
            
        landValue_ /= len(self.zones)
        
        return landValue_
        
        
    def getTax(self):
        pop_ = self.censusPopulation()
        landV_ = self.censusLandValue()
        
        tax_ = pop_ * landV_ * self.taxrate / 100.0
        print("total taxes in this period are $" + str(tax_))
        self.budget += tax_
        
        return tax_
        
    def valves(self):
        taxTable = [200, 150, 120, 100, 80, 50, 30 , 0, -10, -40, -100, -150, -200, -250, -300, -350, -400, -450, -500, -550, -600]

        rPop_ = self.rPop
        cPop_ = self.cPop
        iPop_ = self.iPop
        
        birthRate = 0.02
        
        employment = lambda a, b, c : (b+c)/a if a > 0 else 1
        migration = rPop_ * (employment(rPop_, cPop_, iPop_) - 1)
        births = rPop_ * birthRate
        prjResPop = rPop_ + migration + births
        
        labor = lambda r, c, i : r / (c+i) if c+i > 0 else 1
        laborBaseMax = 1.3
        
        laborB = lambda a : laborBaseMax if a > laborBaseMax else (0 if a <= 0 else a)
        
        l = labor(rPop_, cPop_, iPop_)
        laborBase = laborB(l)
        
        internalMarket = (rPop_+cPop_+iPop_)/3.7
        prjComPop = internalMarket * laborBase
        prjIndPop = cPop_ * laborBase * 1.1
        
        rRatio = (lambda prj, cur: prj/cur if cur > 0 else 1.3)(prjResPop, rPop_)
        cRatio = (lambda prj, cur: prj/cur if cur > 0 else 1)(prjComPop, cPop_)
        iRatio = (lambda prj, cur: prj/cur if cur > 0 else 1)(prjIndPop, iPop_)
        
        rRatio = min(rRatio, 2)
        cRatio = min(cRatio, 2)
        iRatio = min(iRatio, 2)
        
        resRatio = (rRatio - 1.0) * 600 + taxTable[self.taxrate+1]
        comRatio = (cRatio - 1.0) * 600 + taxTable[self.taxrate+1]
        indRatio = (iRatio - 1.0) * 600 + taxTable[self.taxrate+1]

        return [resRatio, comRatio, indRatio]
        
class zone:
    def __init__(self, type, city):
        self.type = type
        self.level = 1
        self.landValue = 100
        self.city = city
        self.setZone()
        
    def setZone(self):
        thisZone_ = self
        
        # set the initial action of each zone.
        def resZone():
            print('[system] a residential zone is planned')
            return 0
            
        def comZone():
            print('[system] a commercial zone is planned')
            return 0
            
        def indZone():
            print('[system] a industrial zone is planned')
            thisZone_.landValue -= 50
            return 0
        
        # make dictionary to avoid using iffffs
        actions = {'r': resZone, 'c': comZone, 'i': indZone}
        
        # do the initial action
        actions[thisZone_.type]()
        
    def doZone(self):
        # each zones check their level up probability and roll the dice
        
        def resZone():
            global_ = self.city.rvalve
            local_ = self.landValue
            
            demand_ = global_ + local_
            
            if rand.randrange(1, demand_) < MAX_RES_DEMAND:
                if self.level < 4:
                    level(+1)
                return 0
                
            if rand.randrange(1, demand_) < MAX_RES_DEMAND:
                if self.level > 0:
                    level(-1)
                return 0
        
        def comZone():
            global_ = self.city.rvalve
            local_ = self.landValue
            
            demand_ = global_ + local_
            
            if rand.randrange(1, demand_) < MAX_RES_DEMAND:
                if self.level < 3:
                    level(+1)
                return 0
                
            if rand.randrange(1, demand_) < MAX_RES_DEMAND:
                if self.level > 0:
                    level(-1)
                return 0
                
        def indZone():
            global_ = self.city.rvalve
            local_ = self.landValue
            
            demand_ = global_ + local_
            
            if rand.randrange(1, demand_) < MAX_RES_DEMAND:
                if self.level < 3:
                    level(+1)
                return 0
                
            if rand.randrange(1, demand_) < MAX_RES_DEMAND:
                if self.level > 0:
                    level(-1)
                return 0
                
        def level(dx):
            if dx > 0:
                self.level += 1
                print(self.type + '-zone gain a level')
                return 0
            if dx < 0:
                self.level -= 1
                print(self.type + '-zone lost a level')
                return 0
                
        actions = {'r': resZone, 'c': comZone, 'i': indZone}
        
        # do the initial action
        actions[self.type]()

# make city!
simcity = city(1000)

simcity.planZone('i')
simcity.displayCity()
simcity.getTax()
simcity.zones[0].doZone()