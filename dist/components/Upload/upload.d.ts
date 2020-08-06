import { FC } from "react";
export interface UploadProps {
    /** 上传地址，必须 */
    action: string;
    /** 默认展示列表 */
    defaultFileList?: UploadFile[];
    /** 上传进度回调 */
    onProgress?: (percentage: number, file: File) => void;
    /** 上传成功回调 */
    onSuccess?: (data: any, file: File) => void;
    /** 上传失败回调 */
    onError?: (err: any, file: File) => void;
    /** 上传前的钩子 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /** 上传状态改变的回调，成功失败都会触发 */
    onChange?: (file: File) => void;
    /** 删除上传列表的回调 */
    onRemove?: (file: UploadFile) => void;
    /** 自定义请求头 */
    headers?: {
        [key: string]: any;
    };
    /** 自定义文件名称 */
    name?: string;
    /** 自定义请求参数 */
    data?: {
        [key: string]: any;
    };
    /** 是否携带cookie */
    withCredentials?: boolean;
    /** 文件类型 */
    accept?: string;
    /** 多文件上传 */
    multiple?: boolean;
    /** 拖拽上传 */
    drag?: boolean;
}
export declare type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export declare const Upload: FC<UploadProps>;
export default Upload;
