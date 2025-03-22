import { useState, useRef } from "react";

export default function ChatInput({ onSend, onTyping }) {
  const [message, setMessage] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  console.log("This is the message", message);

  // Auto-resize textarea
  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "inherit";
    const computed = window.getComputedStyle(textarea);
    const height =
      textarea.scrollHeight +
      parseInt(computed.getPropertyValue("border-top-width"), 10) +
      parseInt(computed.getPropertyValue("border-bottom-width"), 10);

    textarea.style.height = `${Math.min(height, 120)}px`; // Max height of 120px
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() && attachments.length === 0) return;

    onSend({
      text: message,
      // attachments: attachments,
      timestamp: new Date().toISOString(),
    });

    setMessage("");
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? "image" : "file",
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    URL.revokeObjectURL(newAttachments[index].preview);
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  return (
    <div className="border-t border-gray-200 bg-black p-4">
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
          {attachments.map((attachment, index) => (
            <div key={index} className="relative group">
              {attachment.type === "image" ? (
                <img
                  src={attachment.preview}
                  alt="attachment"
                  className="h-20 w-20 object-cover rounded-lg"
                />
              ) : (
                <div className="h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
              <button
                onClick={() => removeAttachment(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex-1 flex items-end gap-2 min-h-[48px] bg-gray-700 rounded-2xl px-4 py-2">
          <div className="flex gap-2">
            {/* Emoji Button */}
            <button
              type="button"
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
              className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors self-end cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            {/* Attachment Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-full text-gray-500 transition-colors self-end cursor-pointer hover:bg-indigo-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            className="hidden"
            accept="image/*,video/*,application/*"
          />

          {/* Text Input */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustTextareaHeight(e.target);
              onTyping?.(true);
            }}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 border-none focus:ring-0 focus:outline-none resize-none min-h-[24px] max-h-[120px] py-1 px-2"
            rows={1}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className={`p-3 rounded-full transition-colors flex-shrink-0 bg-indigo-600 cursor-pointer ${
            message.trim() || attachments.length > 0
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
