import { Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'framer-motion';

function Terminal() {
  return (
    <motion.div
      className="terminal-window"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="terminal-header">
        <div className="terminal-dots">
          <span />
          <span />
          <span />
        </div>

        <div className="terminal-title">
          <TerminalIcon size={13} />
          dhruvi@cloud
        </div>
      </div>

      <div className="terminal-body">
        <div className="terminal-command">
          <span className="terminal-prompt">$</span> whoami
        </div>

        <div className="terminal-output">
          dhruvi-bagga
        </div>

        <div className="terminal-command">
          <span className="terminal-prompt">$</span> specialization
        </div>

        <div className="terminal-output">
          <span>Cloud Engineering</span>
          <span>DevOps</span>
          <span>Cybersecurity</span>
          <span>Data Engineering</span>
        </div>

        <div className="terminal-command">
          <span className="terminal-prompt">$</span> cloud.status
        </div>

        <div className="terminal-output terminal-status">
          <span className="status-check">●</span>
          All systems operational
        </div>

        <div className="terminal-command terminal-last">
          <span className="terminal-prompt">$</span>
          <span className="cursor">_</span>
        </div>
      </div>
    </motion.div>
  );
}

export default Terminal;