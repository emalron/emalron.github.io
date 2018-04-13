# -*- coding: utf-8 -*-
"""
Created on Thu Apr 12 15:57:51 2018

@author: 9010553
"""

class Fighter:
    def __init__(self, hp, atk, defs):
        self.maxHP = hp
        self.curHP = hp
        self.power = atk
        self.defense = defs
        self.damTaken = 0
        self.prevDamTaken = 0
        self.state = 0
        self.automata = [
                        [1, 0, 2],
                        [1, 0, 2],
                        [2, 2, 2]
                        ]
        
    def attack(self, target):
        damage_ = self.power - target.roleList[0].defense
        if damage_ > 0:
            print(self.owner.name + ' attacked ' + target.name + ' for ' + str(damage_))
            target.roleList[0].damTaken += damage_
            
    def update(self):
        if self.state != 2:
            if self.damTaken > 0:
                self.curHP -= self.damTaken
                print(self.owner.name + ' left ' + str(self.curHP) + '(-' + str(self.damTaken) + ') hit points!')
                self.prevDamTaken = self.damTaken
                self.damTaken = 0
        else:
            print(self.owner.name + ' is dead.')