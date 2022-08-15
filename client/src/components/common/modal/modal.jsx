import React from 'react';
import { motion } from 'framer-motion';
import { useModal } from '../../../hooks';

function Modal() {
  const { modal, hideModal } = useModal();
  const defaultWidth = '600px';

  if (!modal.visible) return null;

  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-hidden p-6 fixed top-0 right-0 left-0 z-50 w-full flex items-center justify-center md:inset-0 h-modal md:h-full bg-[rgba(0,0,0,.5)]"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="relative p-4 w-full max-w-2xl h-full max-h-screen md:h-auto"
        style={{ maxWidth: modal.width || defaultWidth }}
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {modal.title || modal.closable ? (
            <div className="flex justify-between items-start px-4 py-3 rounded-t border-b dark:border-gray-600">
              {modal.title && <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{modal.title}</h3>}
              {modal.closable && (
                <button
                  type="button"
                  onClick={hideModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          ) : null}

          <div className="p-6 space-y-6 max-h-[74vh] overflow-y-auto">{modal.content}</div>

          {modal.footerButtons && (
            <div className="flex items-center justify-end px-4 py-3 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              {modal.footerButtons.map((btn, index) => (
                <button
                  key={btn.text}
                  type={btn.type || 'button'}
                  onClick={btn.handler}
                  className={
                    index % 2 === 0
                      ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg' +
                        ' text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                      : 'text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg' +
                        ' border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700' +
                        ' dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
                  }
                >
                  {btn.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Modal;
