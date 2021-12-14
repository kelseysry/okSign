"""empty message

Revision ID: d4b21fd5b67e
Revises: 6e7ef659887f
Create Date: 2021-12-12 21:09:12.745750

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd4b21fd5b67e'
down_revision = '6e7ef659887f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('children', sa.Column('preference', sa.String(length=255), nullable=True))
    op.drop_column('children', 'option')
    op.add_column('genders', sa.Column('preference', sa.String(length=255), nullable=True))
    op.drop_column('genders', 'type')
    op.add_column('orientations', sa.Column('preference', sa.String(length=255), nullable=True))
    op.drop_column('orientations', 'type')
    op.add_column('pets', sa.Column('preference', sa.String(length=255), nullable=True))
    op.drop_column('pets', 'option')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('pets', sa.Column('option', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.drop_column('pets', 'preference')
    op.add_column('orientations', sa.Column('type', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.drop_column('orientations', 'preference')
    op.add_column('genders', sa.Column('type', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.drop_column('genders', 'preference')
    op.add_column('children', sa.Column('option', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.drop_column('children', 'preference')
    # ### end Alembic commands ###