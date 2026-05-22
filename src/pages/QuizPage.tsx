import React from 'react';
import RouteQuiz from '../components/RouteQuiz';

const QuizPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="relative py-14 px-4 border-b overflow-hidden"
        style={{
          borderColor: 'rgba(0,82,255,0.15)',
          background:
            'linear-gradient(180deg, rgba(0,82,255,0.09) 0%, transparent 100%)',
        }}
      >
        <div
          className="absolute inset-0 bg-grid pointer-events-none"
          style={{ backgroundSize: '60px 60px' }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="font-mono text-[11px] text-txt-muted uppercase tracking-[0.3em] mb-2">
            // route selector
          </p>
          <h1 className="font-display text-6xl md:text-7xl text-txt-primary mb-3">
            CHOOSE YOUR ROUTE
          </h1>
          <p className="font-ui text-txt-secondary max-w-lg mx-auto">
            One question. Six paths. Your personalised Base route in 10 seconds.
          </p>
        </div>
      </div>

      {/* Quiz component */}
      <div className="py-12">
        <RouteQuiz />
      </div>
    </div>
  );
};

export default QuizPage;
