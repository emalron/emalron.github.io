# -*- coding: utf-8 -*-
"""
Created on Thu Apr 12 15:58:11 2018

@author: 9010553
"""
import Role as roles

class Basic:
    def __init__(self):
        self.state = 'normal'
        self.automata = []
        self.enemies = []
    
    def search(self):
        for unit in self.owner.field.sides:
            if unit.sideID != self.owner.sideID:
                print(self.owner.name + ' deteced ' + unit.name)
                self.enemies.append(unit)

        self.enemies = sorted(self.enemies, key=lambda x:float(x.roleList[0].power)/float(x.roleList[0].curHP) if x.roleList[0].curHP > 0 else 0, reverse=True)
        
    def diagnosis(self):
#        finding fighter role
        owner_ = self.owner
        for role in owner_.roleList:
            if isinstance(role,roles.Fighter):
                fighter_ = role
        
        if fighter_.prevDamTaken >= fighter_.curHP:
            self.state = 'caution'
        else:
            self.state = 'normal'
        
    def do(self):
        self.diagnosis()
        if self.state == 'normal':
            self.search()
            if self.enemies :
                self.owner.roleList[0].attack(self.enemies[0])
                
        elif self.state == 'caution':
            print('Adios, dude!')