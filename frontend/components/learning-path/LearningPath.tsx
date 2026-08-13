'use client';

import React from 'react';
import { CourseHeader } from './CourseHeader';
import { SkillNode } from './SkillNode';
import { PathConnector } from './PathConnector';
import { RewardChest } from './RewardChest';
import { Mascot } from './Mascot';
import { CourseData } from '@/types/course';

interface LearningPathProps {
  course: CourseData;
}

export const LearningPath: React.FC<LearningPathProps> = ({ course }) => {
  return (
    <div className="w-full flex flex-col items-center pb-12">
      {course.units.map((unit) => (
        <div key={unit.id} className="w-full flex flex-col items-center">
          {/* Green Course Header */}
          <CourseHeader
            sectionNumber={unit.sectionNumber}
            unitNumber={unit.unitNumber}
            title={unit.title}
            description={unit.description}
            bannerColor={unit.bannerColor}
          />

          {/* Vertical Winding Path of Skill Nodes */}
          <div className="w-full flex flex-col items-center py-4 relative">
            {unit.skills.map((skill, index) => {
              const prevSkill = unit.skills[index - 1];
              const startX = prevSkill?.positionOffset || 0;
              const endX = skill.positionOffset || 0;
              const isPrevCompleted = prevSkill ? prevSkill.status === 'COMPLETED' : true;

              return (
                <React.Fragment key={skill.id}>
                  {index > 0 && (
                    <PathConnector
                      startX={startX}
                      endX={endX}
                      isCompleted={isPrevCompleted}
                    />
                  )}

                  <SkillNode
                    id={skill.id}
                    title={skill.title}
                    status={skill.status}
                    positionOffset={skill.positionOffset}
                  />

                  {/* Insert Mascot after 2nd skill node */}
                  {index === 1 && <Mascot positionOffset={75} />}

                  {/* Insert Reward Chest after 3rd skill node */}
                  {index === 2 && (
                    <RewardChest positionOffset={-50} isUnlocked={skill.status === 'COMPLETED'} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
