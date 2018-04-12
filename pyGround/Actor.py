# -*- coding: utf-8 -*-
"""
Created on Thu Apr 12 15:56:42 2018

@author: 9010553
"""

class Object:
    def __init__(self, name):
        self.name = name
        self.enemies = []
        self.aiList = []
        self.roleList = []
        
    def addRole(self,role):
        self.roleList.append(role)
        role.owner = self
        
    def addAI(self,ai):
        self.aiList.append(ai)
        ai.owner = self
        
    def managerAI(self):
        if self.aiList:
            self.aiList[0].do()