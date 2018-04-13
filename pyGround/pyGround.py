# -*- coding: utf-8 -*-
"""
Created on Thu Apr 12 15:58:51 2018

@author: 9010553
"""
import Battlefield as field
import Actor as actors
import Advisor as advisors
import Role as roles
import matplotlib.pyplot as plt
import math

ateam = []
bteam = []

numA = 5
numB = 3

for i in range(numA):
    ateam.append(actors.Object(name="Reds " + str(i)))
    
for i in range(numB):
    bteam.append(actors.Object(name="Blues " + str(i)))


for human in ateam:
    human.addRole(roles.Fighter(hp=5, atk=1, defs=0))
    human.addAI(advisors.Basic())
    
for human in bteam:
    human.addRole(roles.Fighter(hp=5, atk=1, defs=0))
    human.addAI(advisors.Basic())

bf = field.Battlefield(ateam, bteam)

for i in range(100):
    bf.history()
    bf.precollision()
    bf.collision()
    bf.update()
    
rp = plt.plot(bf.histA,'r')
bp = plt.plot(bf.histB,'b')
plt.legend(['Red: '+str(numA), 'Blue: '+str(numB)])
plt.show()
print('A result: ' + str(bf.histA[-1]))
print('B result: ' + str(bf.histB[-1]))

print('Lanc.: ' + str(math.sqrt(numA**2-numB**2)))