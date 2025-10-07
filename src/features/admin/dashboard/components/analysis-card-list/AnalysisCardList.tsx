// components/AnalysisCardList.tsx
import React from 'react';
import { analysisCardsData } from '@/constants/analysis-card-data';
import { AnalysisCard } from '../analysis-card/AnalysisCard';

interface AnalysisCardListProps {
  className?: string;
  cardClassName?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function AnalysisCardList({ 
  className = '', 
  cardClassName = '',
}: AnalysisCardListProps) {


  return (
    <div className={`flex flex-wrap gap-6 ${className}`}>
      {analysisCardsData.map((card) => (
        <AnalysisCard 
          key={card.id} 
          data={card} 
          className={cardClassName}
        />
      ))}
    </div>
  );
}