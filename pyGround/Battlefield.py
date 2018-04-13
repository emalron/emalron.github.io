# -*- coding: utf-8 -*-
"""
Created on Thu Apr 12 15:56:01 2018

@author: 9010553
"""
class Battlefield:
    def __init__(self, ateam, bteam):
        self.sides = []
        self.histA = []
        self.histB = []

        for unit in ateam:
            self.sides.append(unit)
            unit.sideID = 0
            unit.field = self
        for unit in bteam:
            self.sides.append(unit)
            unit.sideID = 1
            unit.field = self
            
    def precollision(self):
        for unit in self.sides:
            unit.aiList[0].diagnosis()
            
    def collision(self):        
        for unit in self.sides:
            unit.managerAI()
            
    def update(self):
        for unit in self.sides:
            for role in unit.roleList:
                role.update()
                
    def history(self):
        numA_ = 0
        numB_ = 0
        for unit in self.sides:
            if unit.sideID == 0 and unit.roleList[0].state != 2:
                numA_ += 1
            if unit.sideID == 1 and unit.roleList[0].state != 2:
                numB_ += 1
                
        self.histA.append(numA_)
        self.histB.append(numB_)