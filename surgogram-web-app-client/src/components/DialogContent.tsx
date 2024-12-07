import React from "react";
import Button from "@/components/Button";
import SingleImageUpload from "@/components/SingleImageUpload";
import TextArea from "@/components/TextArea";
import TextBox from "@/components/TextBox";
import { CreatePostInterface } from "@/interfaces/postInterfaces";

interface DialogContentProps {
    onClose: () => void;
    onCreatePost: (postData: CreatePostInterface) => void;
}

const DialogContent: React.FC<DialogContentProps> = ({ onClose, onCreatePost }) => {
    const [file, setFile] = React.useState<File | null>(null);
    const [caption, setCaption] = React.useState<string>("");
    const [location, setLocation] = React.useState<string>("");

    const handleSubmit = () => {
        if (file && caption && location) {
            const postData: CreatePostInterface = {
                imageFile: file,
                description: caption,
                location: location,
                userId: 1 // Replace with actual user ID
            };
            onCreatePost(postData);
            onClose();
        }
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-md mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Add New Post</h2>
                <span className="text-red-500 font-bold text-lg">surgoGram</span>
            </div>

            {/* Image Upload Section */}
            <div className="mb-4">
                <SingleImageUpload
                    name="imageInput"
                    file={file}
                    setFile={setFile}
                    caption="Select Image to Upload"
                />
            </div>

            {/* Caption Section */}
            <div className="mb-4">
                <TextArea
                    value={caption}
                    placeholder="Enter caption"
                    onChange={setCaption}
                    caption="Caption"
                />
            </div>

            {/* Location Section */}
            <div className="mb-4">
                <TextBox
                    value={location}
                    placeholder="Enter location"
                    onChange={setLocation}
                    caption="Tag Location"
                />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
                <Button
                    caption="Discard"
                    onClick={onClose}
                    background="bg-gray-500 hover:bg-gray-600"

                />
                <Button
                    caption="Create Post"
                    onClick={handleSubmit}
                    background="bg-red-500 hover:bg-red-600"

                />
            </div>
        </div>
    );
};

export default DialogContent;
