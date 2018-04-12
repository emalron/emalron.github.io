# -*- coding: utf-8 -*-
"""
Created on Wed Apr 11 16:25:43 2018
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
            unit.roleList[0].take_damage()
            
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

class Fighter:
    def __init__(self, hp, atk, defs):
        self.maxHP = hp
        self.curHP = hp
        self.power = atk
        self.defense = defs
        self.damTaken = 0
        
    def attack(self, target):
        damage_ = self.power - target.roleList[0].defense
        if damage_ > 0:
            print(self.owner.name + ' attacked ' + target.name + ' for ' + str(damage_))
            target.roleList[0].damTaken += damage_
            
    def take_damage(self):
        if self.damTaken > 0:
            self.curHP -= self.damTaken
            print(self.owner.name + ' left ' + str(self.curHP) + '(-' + str(self.damTaken) + ') hit points!')
            self.damTaken = 0
            
class Basic:
    def __init__(self):
        self.state = []
        self.enemies = []
    
    def search(self):
        for unit in self.owner.field.sides:
            if unit.sideID != self.owner.sideID:
                print(self.owner.name + ' deteced ' + unit.name)
                self.enemies.append(unit)

        self.enemies = sorted(self.enemies, key=lambda x:float(x.roleList[0].power)/float(x.roleList[0].curHP) if x.roleList[0].curHP > 0 else 0, reverse=True)
        
    def do(self):
        self.search()
        if self.enemies :
            self.owner.roleList[0].attack(self.enemies[0])

        


human = Object(name="human")
orc = Object(name="orc")
troll = Object(name='troll')

human.addRole(Fighter(hp=10, atk=2, defs=0))
orc.addRole(Fighter(hp=9, atk=3, defs=0))
troll.addRole(Fighter(hp=11, atk=4, defs=0))

human.addAI(Basic())
orc.addAI(Basic())
troll.addAI(Basic())

ateam = [human, troll]
bteam = [orc]

bf = Battlefield(ateam, bteam)

bf.collision()
bf.update()