# -*- coding: utf-8 -*-
"""
Created on Tue Mar 20 10:09:08 2018

@author: 9010553
"""

#setting
ZONE_COST = 100

class city:
    def __init__(self, fund):
        self.budget = fund
        self.zones = []
        self.taxrate = 7
        
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
        print("total taxes in this period is $" + str(tax_))
        
        self.budget += tax_
        
        return tax_
        
class zone:
    def __init__(self, type, city):
        self.type = type
        self.level = 1
        self.landValue = 100
        self.city = city
        
    def setZone(self):
        for i in self.zones:
            if i.type == 'r':
                                                                                                                                                                            rnum_ += 1
            elif i.type == 'c':
                cnum_ += 1
            elif i.type == 'i':
                inum_ += 1

# make city!
simcity = city(1000)

simcity.planZone('c')
simcity.displayCity()
simcity.getTax()