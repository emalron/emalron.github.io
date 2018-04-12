# -*- coding: utf-8 -*-
"""
Created on Thu Apr 12 15:56:01 2018

@author: 9010553
"""
class Battlefield:
    def __init__(self, ateam, bteam):
        self.sides = []

        for unit in ateam:
            self.sides.append(unit)
            unit.sideID = 0
            unit.field = self
        for unit in bteam:
            self.sides.append(unit)
            unit.sideID = 1
            unit.field = self
            
    def collision(self):
        for unit in self.sides:
            unit.managerAI()
            
    def update(self):
        for unit in self.sides:
            for role in unit.roleList:
                role.update()