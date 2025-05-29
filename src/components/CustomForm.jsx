import iconUpload from "../assets/images/icon-upload.svg";
import iconInfo from "../assets/images/icon-info.svg";
import iconInfoError from "../assets/images/icon-info-red.svg";
import { processFile } from '../utils/fileUtils'
import { useState, useRef } from "react";
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    fullname: z.string().min(1, "Full name is required").max(20, "Full name must be less than 50 characters"),
    email: z.string().email("Invalid email address").max(50, "Email must be less than 50 characters"),
    username: z.string()
        .min(1, "GitHub username is required")
        .max(20, "GitHub username must be less than 20 characters")
        .regex(/^@/, "GitHub username must start with '@'"),
})

function CustomForm({ setFormData, setSubmitted }) {
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState("");
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            fullname: '',
            email: '',
            username: ''
        }
    });

    const handleDrop = async (event) => {
        event.preventDefault();
        setFileError("");
        const fileDropped = event.dataTransfer.files;
        if (fileDropped.length > 0) {
            const file = fileDropped[0];
            try {
                const res = await processFile(file);
                setFile(res);
            } catch (error) {
                setFileError(error)
            }
        }
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleChange = async (event) => {
        setFileError("");
        const file = event.target.files[0];
        try {
            const res = await processFile(file);
            setFile(res);
        } catch (error) {
            setFileError(error);
        }
    };

    const onSubmit = (data) => {
        if (!file) {
            setFileError("Please upload an image");
            return;
        }
        setFormData({
            fullname: data.fullname,
            email: data.email,
            username: data.username,
            imgUrl: file,
        });
        setSubmitted(true);
    }

    return (
        <form className="flex flex-col font-family-inconsolata gap-4 z-50"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <label className="text-[.9rem]" htmlFor="avatar">Upload Avatar</label>
                {!file ? (
                    <div
                        className="gap-2.5 focus:outline-3 focus:outline-double focus:outline-neutral-500 cursor-pointer w-full border-[rgba(101,101,101,0.6)] border-2 border-dashed rounded-lg flex flex-col items-center p-4 bg-white-opacity-10"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={handleClick}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && handleClick()}
                    >
                        <img src={iconUpload} alt="uploadImage" className="w-10 p-1 bg-[rgba(80,79,79,0.3)] rounded-lg bg-white-opacity-10 border-[rgba(101,101,101,0.6)] border-1" />
                        <p className="text-neutral-500 text-[.78rem]">Drag and drop or click to upload</p>
                    </div>
                ) : (
                    <div className="focus:outline-3 focus:outline-double focus:outline-neutral-500 w-full border-[rgba(101,101,101,0.6)] border-2 border-dashed rounded-lg flex gap-4 flex-col items-center p-4 bg-white-opacity-10">
                        <img
                            src={file}
                            alt="preview"
                            className="mt-2 w-12 h-12 object-cover rounded"
                        />
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="buttonAvatar"
                                onClick={() => {
                                    setFile(null)
                                    if (inputRef.current) {
                                        inputRef.current.value = null;
                                    }
                                }}
                            >
                                Remove Image
                            </button>

                            <button
                                type="button"
                                className="buttonAvatar"
                                onClick={handleClick}
                            >
                                Change Image
                            </button>
                        </div>
                    </div>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                />
                {
                    fileError ? (
                        <div className="flex gap-2 text-neutral-400">
                            <img src={iconInfoError} alt="infoImage" className="w-3.5 mt-0.5" />
                            <p className="text-red-500 text-xs mt-1">
                                {fileError}
                            </p>
                        </div>
                    ) : (
                        <div className="flex gap-2 text-neutral-400">
                            <img src={iconInfo} alt="infoImage" className="w-3.5" />
                            <p className="text-[.7rem]">
                                Upload your photo (JPG or PNG, max size: 500kb)
                            </p>
                        </div>
                    )
                }

            </div>
            <div className="inputFormContainer">
                <label className="text-[.9rem]" htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className={`inputForm bg-white-opacity-10 ${errors.fullname ? 'inputFormError' : ''}`}
                    {...register('fullname')}
                />
                {errors.fullname &&

                    <div className="flex gap-2 text-neutral-400">
                        <img src={iconInfoError} alt="infoImage" className="w-3.5 mt-0.5" />
                        <p className="text-red-500 text-xs mt-1">
                            {errors.fullname.message}
                        </p>
                    </div>
                }
            </div>
            <div className="inputFormContainer">
                <label className="text-[.9rem]" htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    className={`inputForm bg-white-opacity-10 ${errors.email ? 'inputFormError' : ''}`}
                    {...register('email')}
                />
                {errors.email &&
                    <div className="flex gap-2 text-neutral-400">
                        <img src={iconInfoError} alt="infoImage" className="w-3.5 mt-0.5" />
                        <p className="text-red-500 text-xs mt-1">
                            {errors.email.message}
                        </p>
                    </div>
                }
            </div>
            <div className="inputFormContainer">
                <label className="text-[.9rem]" htmlFor="username">GitHub Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="@yourusername"
                    className={`inputForm bg-white-opacity-10 ${errors.username ? 'inputFormError' : ''}`}
                    {...register('username')}
                />
                {errors.username &&

                    <div className="flex gap-2 text-neutral-400">
                        <img src={iconInfoError} alt="infoImage" className="w-3.5 mt-0.5" />
                        <p className="text-red-500 text-xs mt-1">
                            {errors.username.message}
                        </p>
                    </div>
                }
            </div>
            <input
                type="submit"
                value="Generate My Ticket"
                className="bg-orange-700 p-2 rounded-lg text-neutral-900 font-extrabold mt-1 cursor-pointer focus:outline-3 focus:outline-double focus:outline-neutral-500 text-[.9rem]"
            />
        </form>
    );
}

export default CustomForm;
