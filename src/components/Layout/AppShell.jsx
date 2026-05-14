import PropTypes from 'prop-types';
import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

function AppShell({ route, chapters, currentChapterId, progressPercent, onNavigate, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <Sidebar
        isOpen={sidebarOpen}
        chapters={chapters}
        currentChapterId={currentChapterId}
        route={route}
        onNavigate={onNavigate}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="min-w-0 px-4 pb-10 pt-4 lg:px-6">
        <TopBar
          route={route}
          currentChapterId={currentChapterId}
          totalChapters={chapters.length}
          progressPercent={progressPercent}
          onMenu={() => setSidebarOpen((value) => !value)}
          onOpenHome={() => onNavigate({ page: 'home' })}
          onOpenProgress={() => onNavigate({ page: 'progress' })}
        />
        <main className="pt-5">{children}</main>
      </div>
    </div>
  );
}

AppShell.propTypes = {
  route: PropTypes.object.isRequired,
  chapters: PropTypes.array.isRequired,
  currentChapterId: PropTypes.number.isRequired,
  progressPercent: PropTypes.number.isRequired,
  onNavigate: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default AppShell;
