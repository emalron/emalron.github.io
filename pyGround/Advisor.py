# -*- coding: utf-8 -*-
"""
Created on Thu Apr 12 15:58:11 2018

@author: 9010553
"""
import Role as roles

class Basic:
    def __init__(self):
        self.enemies = []
        self.fighter = self
    
    def search(self):
        self.enemies = []
        for unit in self.owner.field.sides:
            if unit.sideID != self.owner.sideID and unit.roleList[0].state is not 2:
#                print(self.owner.name + ' deteced ' + unit.name)
                self.enemies.append(unit)

        self.enemies = sorted(self.enemies, key=lambda x:float(x.roleList[0].power)/float(x.roleList[0].curHP) if x.roleList[0].curHP > 0 else 0, reverse=True)
        
    def diagnosis(self):
#        finding fighter role
        owner_ = self.owner
        for role in owner_.roleList:
            if isinstance(role,roles.Fighter):
                self.fighter = role
        
        cur = self.fighter.state
        mata = self.fighter.automata
        out_ = 0
        
        if self.fighter.curHP <= 0:
            out_ = 2
        elif self.fighter.prevDamTaken >= self.fighter.curHP:
            out_ = 0
        else:
            out_ = 1
            
        self.fighter.state = mata[cur][out_]
        
    def do(self):
        state = self.fighter.state
        
        if state != 2:
            self.search()
            if self.enemies :
                for enemy in self.enemies:
                    if enemy.roleList[0].curHP > enemy.roleList[0].damTaken:
                        self.owner.roleList[0].attack(enemy)
                        break
                
#        elif state == 1:
#            print('Adios, dude!')
            
        elif state == 2:
            pass