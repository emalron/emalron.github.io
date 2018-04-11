# -*- coding: utf-8 -*-
"""
Created on Wed Apr 11 16:25:43 2018

@author: 9010553
"""
class Object:
    def __init__(self, name, fighter, ai):
        self.name = name
        self.fighter = fighter
        if self.fighter:
            self.fighter.owner = self
        self.ai = ai
        if self.ai:
            self.ai.owner = self
        self.enemies = []

class Fighter:
    def __init__(self, hp, atk, defs):
        self.maxHP = hp
        self.curHP = hp
        self.power = atk
        self.defense = defs
        
    def attack(self, target):
        damage_ = self.power - target.fighter.defense
        if damage_ > 0:
            print(self.owner.name + ' attacked ' + target.name + ' for ' + str(damage_))
            target.fighter.take_damage(damage_)
            
    def take_damage(self, damage):
        if damage > 0:
            self.curHP -= damage
            print(self.owner.name + ' has ' + str(self.curHP) + ' hit points!')
            
class Basic:
    def search(self):
        for unit in self.owner.field.sides:
            if unit.sideID != self.owner.sideID:
                print(self.owner.name + ' deteced ' + unit.name)
                self.owner.enemies.append(unit)

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
        
hum_fighter = Fighter(hp=10, atk=2, defs=0)
orc_fighter = Fighter(hp=9, atk=3, defs=0)
trl_fighter = Fighter(hp=11, atk=4, defs=0)

human = Object(name="human", fighter=hum_fighter, ai=Basic())
orc = Object(name="orc", fighter=orc_fighter, ai=Basic())
troll = Object(name='troll', fighter=trl_fighter, ai=Basic())

ateam = [human, troll]
bteam = [orc]

bf = Battlefield(ateam, bteam)
for unit in bf.sides:
    unit.ai.search()
    print('\n')