# -*- coding: utf-8 -*-
"""
Created on Thu Apr 12 15:58:51 2018

@author: 9010553
"""
import Battlefield as field
import Actor as actors
import Advisor as advisors
import Role as roles

human = actors.Object(name="human")
orc = actors.Object(name="orc")
troll = actors.Object(name='troll')

human.addRole(roles.Fighter(hp=10, atk=2, defs=0))
orc.addRole(roles.Fighter(hp=9, atk=3, defs=0))
troll.addRole(roles.Fighter(hp=11, atk=4, defs=0))

human.addAI(advisors.Basic())
orc.addAI(advisors.Basic())
troll.addAI(advisors.Basic())

ateam = [human, troll]
bteam = [orc]

bf = field.Battlefield(ateam, bteam)

for i in range(3):
    bf.collision()
    bf.update()