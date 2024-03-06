package introse.group20.hms.core.exceptions;

public class NotFoundException extends BaseException {
//    public int statusCode = 404;
    @Override
    public int getStatusCode() {
        return 404;
    }

    public NotFoundException(String message)
    {
        super(message);
    }
}
