package introse.group20.hms.core.exceptions;

public class BadRequestException extends BaseException{
//    public int statusCode = 400;
    @Override
    public int getStatusCode() {
        return 400;
    }

    public BadRequestException(String message)
    {
        super(message);
    }
}
